import pathlib
import queue
import threading
from typing import Optional
import pathlib

import hexalog.ports

from cry_baby.app.core import ports
from cry_baby.pkg.audio_file_client.core.ports import AudioFileClient


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

    def evaluate_from_audio_file(
        self,
    ) -> float:
        """
        Classify audio from a file and return the probability that the audio contains a baby crying.
        """
        self.logger.info(f"Service beginning to evaluate audio from file: {self.audio_file_path}")
        return self.classifier.classify(self.audio_file_path)

    def continously_evaluate_from_audio_file(self):
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

    def stop_continuous_evaluation(self):
        self.logger.info("Service stopping continuous evaluation")
