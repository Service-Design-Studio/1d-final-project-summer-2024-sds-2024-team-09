import asyncio
import pathlib
import pdb
import shutil
import threading
from typing import List
import os
import librosa
import requests
import soundfile as sf
from moviepy.editor import VideoFileClip, concatenate_videoclips
from pydub import AudioSegment
import hexalog.ports
from telegram import Bot
from datetime import datetime, timezone, timedelta

from cry_baby.app.core import ports
from cry_baby.pkg.audio_file_client.core.ports import AudioFileClient
from cry_baby.pkg.upload_video.upload_video_sql import upload_to_gcs
from cry_baby.pkg.telegram.telegram_bot import send_message
from cry_baby.app.core.utils import convert_webm_to_wav, split_audio_into_chunks, evaluate_from_audio_file, combine_video, send_telegram_message, send_telegram_video

SHUTDOWN_EVENT = threading.Event()

class CryBabyService(ports.Service):
    def __init__(
        self,
        logger: hexalog.ports.Logger,
        classifier: ports.Classifier,
        video_file_path: pathlib.Path,
        raw_audio_file_path: pathlib.Path,
        temp_audio_file_path: pathlib.Path,
        split_audio_file_path: pathlib.Path,
        cry_video_file_path: pathlib.Path,
        repository: ports.Repository,
        audio_file_client: AudioFileClient,
        telegram_bot_token: str,
        telegram_chat_id: str,
    ):
        self.logger = logger
        self.classifier = classifier
        self.video_file_path = video_file_path
        self.raw_audio_file_path = raw_audio_file_path
        self.temp_audio_file_path = temp_audio_file_path
        self.split_audio_file_path = split_audio_file_path
        self.cry_video_file_path = cry_video_file_path
        self.repository = repository
        self.audio_file_client = audio_file_client
        self.cry_idle_counter = 0
        self.start_video = ""
        self.end_video = ""
        self.start_time = ""
        self.end_time = ""
        self.telegram_bot_token = telegram_bot_token
        self.cry_detection_bot = Bot(token=telegram_bot_token)
        self.telegram_chat_id = telegram_chat_id

    def convert_webm_to_wav(self, webm_file: pathlib.Path, 
                            temp_audio_file_path: pathlib.Path, 
                            raw_audio_file_path: pathlib.Path):
        convert_webm_to_wav(webm_file, temp_audio_file_path, raw_audio_file_path, self.logger)

    def split_audio_into_chunks(self, audio_file_path: pathlib.Path, chunk_duration: int = 4) -> List[pathlib.Path]:
        return split_audio_into_chunks(audio_file_path, self.split_audio_file_path, chunk_duration, self.logger)

    def evaluate_from_audio_file(self, audio_file_path: pathlib.Path):
        return evaluate_from_audio_file(audio_file_path, self.classifier, self.repository, self.logger)
    
    def combine_video(self, directory: pathlib.Path, start_video: str, end_video: str) -> str:
        return combine_video(directory, start_video, end_video, self.logger)

    def upload_to_gcs_service(self, combined_video_name):
        #pdb.set_trace()
        combined_video_path_str = str(self.cry_video_file_path / combined_video_name)
        duration = VideoFileClip(combined_video_path_str).duration
        
        self.send_telegram_video(self.telegram_bot_token, 
                                 self.telegram_chat_id, 
                                 combined_video_path_str, 
                                 f"Cry Detected 👶🏻 for {duration}secs from {self.start_time} to {self.end_time}")
        video_metadata = {
            "title": str(pathlib.Path(combined_video_name).stem),
            "duration": duration,  # Duration in seconds
            "user_id": 2,
            "is_critical": False
        } # 'AItest_upload/ai_classifier_uploads/' + 
        self.logger.info((combined_video_path_str,str(pathlib.Path(combined_video_name).stem)))
        upload_to_gcs('video-upload-jya', 
                      combined_video_path_str, 
                      str(pathlib.Path(combined_video_name).stem)+".webm", 
                      video_metadata)
        self.logger.info(f"Uploading {combined_video_name} to GCS")
        self.cry_idle_counter = 0
        self.start_video = ""
        self.end_video = ""
        self.start_time = ""
        self.end_time = ""
        for file in self.cry_video_file_path.iterdir():
            if file.suffix == ".webm" or file.suffix == ".mp4":
                os.remove(file)

    def send_telegram_message(self, bot, chat_id, message):
        return send_telegram_message(bot, chat_id, message)
    
    def send_telegram_video(self, bot, chat_id, video_path:str, caption:str):
        if not os.path.exists(video_path):
            self.logger.error(f"Video file {video_path} does not exist")
            return {"ok": False, "error": "Video file does not exist"}
        
        self.logger.info(f"Sending video {video_path} to Telegram")
        response = send_telegram_video(bot, chat_id, video_path, caption)
        
        # if not response.get('ok'):
        #     self.logger.error(f"Failed to send video: {response}")
        # else:
        #     self.logger.info(f"Video sent successfully: {response}")
        
        return response

    def continuously_evaluate_from_directory(self):
        """
        Continuously monitor a directory and classify audio files as long as the directory is not empty.
        """
        self.logger.info(f"Starting continuous evaluation in directory: {self.video_file_path}")
        while not SHUTDOWN_EVENT.is_set():
            try:
                video_files = list(sorted(self.video_file_path.glob('*.webm')))
                if video_files:
                    for video in video_files:
                        self.convert_webm_to_wav(video,self.temp_audio_file_path,self.raw_audio_file_path)
                        raw_audio_files = list(sorted(self.raw_audio_file_path.glob('*.wav')))
                        for audio in raw_audio_files:
                            prediction = self.evaluate_from_audio_file(audio)
                            audio.unlink()
                        if prediction < 0.8:
                            if self.start_video == "":
                                os.remove(video)
                            elif self.cry_idle_counter < 5:
                                shutil.move(str(video), str(self.cry_video_file_path / video.name))
                                self.cry_idle_counter += 1
                        if prediction > 0.8:
                            self.cry_idle_counter = 0
                            if self.start_video == "":
                                self.send_telegram_message(self.telegram_bot_token, 
                                                           self.telegram_chat_id, 
                                                           "Oh no! 🥲 A cry has been detected at Living Room Camera. Check the crybaby app now to see what's going on!\nhttps://crybaby-uiux-tkzaqm6e7a-as.a.run.app/user")
                                self.start_video = video.name
                                self.start_time = datetime.now(timezone.utc)+ timedelta(hours=8)
                            self.end_video = video.name
                            self.end_time = datetime.now(timezone.utc)+ timedelta(hours=8)
                            shutil.move(str(video), str(self.cry_video_file_path / video.name))
                        if self.cry_idle_counter == 5:
                            combined_video_name = self.combine_video(self.cry_video_file_path, self.start_video, self.end_video)
                            self.logger.info("5 in a row no cries reached")
                            if combined_video_name:
                                self.upload_to_gcs_service(combined_video_name)
                                
                if not video_files:
                    self.logger.info("No audio files to process. Waiting for new files...")
                    SHUTDOWN_EVENT.wait(5)  # Wait before checking the directory again
            except KeyboardInterrupt:
                self.logger.info("Stopping CryBabyService")
                self.logger.info("Cleaning cry_videos directory")
                for file in self.cry_video_file_path.iterdir():
                    if file.suffix == ".webm" or file.suffix == ".mp4":
                        os.remove(file)
                self.stop_continuous_evaluation()
                self.logger.debug("CryBabyService has stopped")
                SHUTDOWN_EVENT.set()
                break
            except Exception as e:
                self.logger.error(f"Error during continuous evaluation: {e}")

    def stop_continuous_evaluation(self):
        self.logger.info("Service stopping continuous evaluation")
        SHUTDOWN_EVENT.set()
