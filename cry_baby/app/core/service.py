import pathlib
import threading
from typing import List
import os
import librosa
import soundfile as sf
from moviepy.editor import VideoFileClip
from pydub import AudioSegment
import hexalog.ports

from cry_baby.app.core import ports
from cry_baby.pkg.audio_file_client.core.ports import AudioFileClient

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
        repository: ports.Repository,
        audio_file_client: AudioFileClient,
    ):
        self.logger = logger
        self.classifier = classifier
        self.video_file_path = video_file_path
        self.raw_audio_file_path = raw_audio_file_path
        self.temp_audio_file_path = temp_audio_file_path
        self.split_audio_file_path = split_audio_file_path
        self.repository = repository
        self.audio_file_client = audio_file_client

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
        except Exception as e:
            self.logger.error(f"Failed to evaluate {audio_file_path}: {e}")

    def continuously_evaluate_from_directory(self):
        """
        Continuously monitor a directory and classify audio files as long as the directory is not empty.
        """
        self.logger.info(f"Starting continuous evaluation in directory: {self.video_file_path}")
        while not SHUTDOWN_EVENT.is_set():
            try:
                video_files = list(self.video_file_path.glob('*.mp4')) # adjust to webm
                if video_files:
                    for video in video_files:
                        self.convert_webm_to_wav(video)
                        video.unlink()

                raw_audio_files = list(self.raw_audio_file_path.glob('*.wav'))
                print(raw_audio_files)
                if raw_audio_files:
                    for raw_audio_file in raw_audio_files:
                        chunk_paths = self.split_audio_into_chunks(raw_audio_file)
                        raw_audio_file.unlink()

                split_audio_files = list(self.split_audio_file_path.glob('*.wav'))
                for audio_chunk in split_audio_files:
                    self.evaluate_from_audio_file(audio_chunk)
                    os.remove(audio_chunk)
                
                if not video_files and not raw_audio_files and not split_audio_files:
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
