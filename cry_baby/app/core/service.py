import pathlib
import pdb
import shutil
import threading
from typing import List
import os
import librosa
import soundfile as sf
from moviepy.editor import VideoFileClip, concatenate_videoclips
from pydub import AudioSegment
import hexalog.ports

from cry_baby.app.core import ports
from cry_baby.pkg.audio_file_client.core.ports import AudioFileClient
from cry_baby.pkg.upload_video.upload_video import UploadVideo

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

    def convert_webm_to_wav(self, webm_file: pathlib.Path):
        try:
            # Load the video file
            video = VideoFileClip(str(webm_file))
            
            # Extract audio and save it as a temporary file
            audio_temp_file = self.temp_audio_file_path / f"{webm_file.stem}.mp3"
            video.audio.write_audiofile(str(audio_temp_file))
            
            # Convert the temporary audio file to WAV format
            audio = AudioSegment.from_file(str(audio_temp_file), format="mp3")
            audio.export(str(self.raw_audio_file_path / f"{audio_temp_file.stem}.wav"), format="wav")
            
            # Clean up the temporary file
            os.remove(audio_temp_file)
            self.logger.info(f"Conversion complete: {self.raw_audio_file_path}")
        except Exception as e:
            self.logger.error(f"Failed to convert {webm_file} to WAV: {e}")

    def split_audio_into_chunks(self, audio_file_path: pathlib.Path, chunk_duration: int = 4) -> List[pathlib.Path]:
        """
        Split an audio file into chunks of specified duration (in seconds).
        Returns a list of paths to the chunk files.
        """
        try:
            y, sr = librosa.load(audio_file_path, sr=None)
            duration = librosa.get_duration(y=y, sr=sr)
            chunk_paths = []

            for start in range(0, int(duration), chunk_duration):
                end = min(start + chunk_duration, int(duration))
                chunk = y[start*sr:end*sr]
                chunk_file_path = self.split_audio_file_path / f"{audio_file_path.stem}_{start}-{end}.wav"
                sf.write(chunk_file_path, chunk, sr)
                chunk_paths.append(chunk_file_path)

            return chunk_paths
        except Exception as e:
            self.logger.error(f"Failed to split {audio_file_path} into chunks: {e}")
            return []

    def evaluate_from_audio_file(self, audio_file_path: pathlib.Path):
        """
        Classify audio from a file and return the probability that the audio contains a baby crying.
        """
        try:
            self.logger.info(f"Evaluating audio file: {audio_file_path}")
            prediction = self.classifier.classify(audio_file_path)
            self.logger.debug(f"Prediction for {audio_file_path}: {prediction}")
            self.repository.save(audio_file_path, prediction)
            return prediction
        except Exception as e:
            self.logger.error(f"Failed to evaluate {audio_file_path}: {e}")
            return 0  # Assuming 0 as the default prediction when evaluation fails
    
    def combine_video(self, directory: pathlib.Path, start_video: str, end_video: str) -> str:
        clips = []
        # Iterate over sorted files in the directory
        for file_name in sorted(directory.glob('*.mp4')):
            # Check if the file is within the specified range
            if start_video <= file_name.name <= end_video:
                # Load the video file
                clip = VideoFileClip(str(file_name))
                clips.append(clip)
                # Remove the file after processing
                os.remove(file_name)

        # Check if there are any clips to concatenate
        if not clips:
            self.logger.info("No MP4 videos found in the specified range.")
            return ""

        # Concatenate the video clips
        final_clip = concatenate_videoclips(clips, method="compose")
        
        # Define the output path
        output_path = directory / f"{start_video}_to_{end_video}_combined.mp4"
        
        # Write the final video file
        final_clip.write_videofile(str(output_path), codec='libx264', audio_codec='aac')
        
        return str(output_path)

    def upload_to_gcs_service(self, combined_video_name):
        combined_video_path_str = str(self.cry_video_file_path / combined_video_name)
        upload = UploadVideo('video-upload-jya', combined_video_path_str, 'AItest_upload/ai_classifier_uploads/' + str(pathlib.Path(combined_video_name).stem) + ".mp4")
        upload.upload_to_gcs()
        self.cry_idle_counter = 0
        self.start_video = ""
        self.end_video = ""
        for file in self.cry_video_file_path.iterdir():
            os.remove(file)

    def continuously_evaluate_from_directory(self):
        """
        Continuously monitor a directory and classify audio files as long as the directory is not empty.
        """
        self.logger.info(f"Starting continuous evaluation in directory: {self.video_file_path}")
        while not SHUTDOWN_EVENT.is_set():
            try:
                video_files = list(sorted(self.video_file_path.glob('*.mp4')))
                if video_files:
                    for video in video_files:
                        self.convert_webm_to_wav(video)
                        raw_audio_files = list(sorted(self.raw_audio_file_path.glob('*.wav')))
                        for audio in raw_audio_files:
                            prediction = self.evaluate_from_audio_file(audio)
                            audio.unlink()
                            if prediction < 0.8 and self.cry_idle_counter == 0:
                                os.remove(video)
                            if prediction > 0.8:
                                if self.cry_idle_counter == 0:
                                    self.start_video = video.name
                                    self.end_video = video.name
                                else:
                                    self.end_video = video.name
                                shutil.move(str(video), str(self.cry_video_file_path / video.name))
                                self.cry_idle_counter += 1
                            elif self.cry_idle_counter < 10:
                                shutil.move(str(video), str(self.cry_video_file_path / video.name))
                            if self.cry_idle_counter == 10:
                                combined_video_name = self.combine_video(self.cry_video_file_path, self.start_video, self.end_video)
                                self.logger.info("10 reached")
                                if combined_video_name:
                                    self.upload_to_gcs_service(combined_video_name)
                                
                if not video_files:
                    if self.cry_idle_counter != 0:
                        self.logger.info(f"Combining videos from {self.start_video} to {self.end_video}")
                        combined_video_name = self.combine_video(self.cry_video_file_path, self.start_video, self.end_video)
                        self.logger.info("less than 10 reached")
                        if combined_video_name:
                            self.upload_to_gcs_service(combined_video_name)
                    self.logger.info("No audio files to process. Waiting for new files...")
                    SHUTDOWN_EVENT.wait(5)  # Wait before checking the directory again
            except KeyboardInterrupt:
                self.logger.info("Stopping CryBabyService")
                self.stop_continuous_evaluation()
                self.logger.debug("CryBabyService has stopped")
                SHUTDOWN_EVENT.set()
                break
            except Exception as e:
                self.logger.error(f"Error during continuous evaluation: {e}")

    def stop_continuous_evaluation(self):
        self.logger.info("Service stopping continuous evaluation")
        SHUTDOWN_EVENT.set()

