import pathlib
import queue
import threading
from typing import Optional

import hexalog.ports

from cry_baby.app.core import ports
from cry_baby.pkg.audio_file_client.core.ports import AudioFileClient

SHUTDOWN_EVENT = threading.Event()

class CryBabyService(ports.Service):
    def __init__(
        self,
        logger: hexalog.ports.Logger,
        classifier: ports.Classifier,
        audio_file_path: pathlib.Path,
        repository: ports.Repository,
        audio_file_client: AudioFileClient,
    ):
        self.logger = logger
        self.classifier = classifier
        self.audio_file_path = audio_file_path
        self.repository = repository
        self.audio_file_client = audio_file_client
        self.thread = None

    def evaluate_from_audio_file(self) -> float:
        """
        Classify audio from a file and return the probability that the audio contains a baby crying.
        """
        self.logger.info(f"Service beginning to evaluate audio from file: {self.audio_file_path}")
        prediction = self.classifier.classify(self.audio_file_path)
        self.repository.save(self.audio_file_path, prediction)
        return prediction

    def continuously_evaluate_from_audio_file(self):
        """
        Continuously classify audio from the specified file.
        """
        self.logger.info(f"Service beginning to continuously evaluate audio from file: {self.audio_file_path}")
        while not SHUTDOWN_EVENT.is_set():
            try:
                prediction = self.classifier.classify(self.audio_file_path)
                self.logger.debug(f"Prediction: {prediction}")
                self.repository.save(self.audio_file_path, prediction)
                SHUTDOWN_EVENT.wait(1)  # Add delay to avoid tight loop
            except KeyboardInterrupt:
                self.logger.info("Stopping CryBabyService")
                self.stop_continuous_evaluation()
                self.logger.debug("CryBabyService has stopped")
                SHUTDOWN_EVENT.set()
                break

    def continuously_evaluate_from_directory(self, directory: pathlib.Path):
        """
        Continuously monitor a directory and classify audio files as long as the directory is not empty.
        """
        self.logger.info(f"Service beginning to continuously evaluate audio files from directory: {directory}")
        while not SHUTDOWN_EVENT.is_set():
            try:
                audio_files = list(directory.glob('*.wav'))
                if audio_files:
                    for audio_file in audio_files:
                        prediction = self.classifier.classify(audio_file)
                        self.logger.debug(f"Prediction for {audio_file}: {prediction}")
                        self.repository.save(audio_file, prediction)
                        audio_file.unlink()  # Remove the file after processing
                else:
                    self.logger.info("No audio files to process. Waiting for new files...")
                    SHUTDOWN_EVENT.wait(5)  # Wait before checking the directory again
            except KeyboardInterrupt:
                self.logger.info("Stopping CryBabyService")
                self.stop_continuous_evaluation()
                self.logger.debug("CryBabyService has stopped")
                SHUTDOWN_EVENT.set()
                break

    def stop_continuous_evaluation(self):
        self.logger.info("Service stopping continuous evaluation")
        SHUTDOWN_EVENT.set()
