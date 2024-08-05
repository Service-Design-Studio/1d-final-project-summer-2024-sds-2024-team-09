import importlib.util
import os
import pathlib
import threading

from hexalog.adapters.cli_logger import ColorfulCLILogger
from huggingface_hub import from_pretrained_keras, hf_hub_download, login

from cry_baby.app.adapters.repositories.json_repo import JSONRepo
from cry_baby.app.core.ports import Repository
from cry_baby.app.core.service import CryBabyService
from cry_baby.pkg.audio_file_client.adapters.librosa_client import LibrosaClient
from cry_baby.pkg.audio_file_client.core.domain import (
    MelSpectrogramPreprocessingSettings,
)

SHUTDOWN_EVENT = threading.Event()


def tensorflow_available():
    tensorflow_spec = importlib.util.find_spec("tensorflow")
    return tensorflow_spec is not None


def tflite_runtime_available():
    tflite_spec = importlib.util.find_spec("tflite_runtime")
    return tflite_spec is not None


def run_continously(
    logger: ColorfulCLILogger,
    directory: pathlib.Path,
    classifier,
    repository: Repository,
    audio_file_client: LibrosaClient,
):
    service = CryBabyService(
        logger=logger, 
        classifier=classifier, 
        video_file_path=directory / "video",
        raw_audio_file_path=directory / "raw",
        temp_audio_file_path=directory / "temp",
        split_audio_file_path=directory / "split", 
        cry_video_file_path=directory / "cry_videos",
        repository=repository, 
        audio_file_client=audio_file_client,
        telegram_bot_token=os.getenv("TELEGRAM_BOT_TOKEN"),
        telegram_chat_id=os.getenv("TELEGRAM_CHAT_ID")
    )
    service.continuously_evaluate_from_directory()


def main():
    logger = ColorfulCLILogger()
    audio_directory = pathlib.Path(os.getenv("SAVE_AUDIO_DIR"))
    repository = JSONRepo(json_file_path=pathlib.Path("cry_baby.json"))

    librosa_audio_file_client = LibrosaClient()

    mel_spectrogram_preprocessing_settings = MelSpectrogramPreprocessingSettings(
        sampling_rate_hz=16000,
        number_of_mel_bands=128,
        duration_seconds=4,
        hop_length=512,
    )

    if tensorflow_available():
        from cry_baby.app.adapters.classifiers.tensorflow import TensorFlowClassifier

        model = from_pretrained_keras("ericcbonet/cry-baby")
        classifier = TensorFlowClassifier(
            model=model,
            audio_file_client=librosa_audio_file_client,
            mel_spectrogram_preprocessing_settings=mel_spectrogram_preprocessing_settings,
        )
        logger.info("Using TensorFlow classifier.")
    elif tflite_runtime_available():
        from cry_baby.app.adapters.classifiers.tf_lite import TFLiteClassifier

        token = os.getenv("HUGGING_FACE_TOKEN")
        if not token:
            logger.error("HUGGING_FACE_TOKEN does not exist in the environment")
            return
        login(token=token)
        model_path = hf_hub_download(
            repo_id="ericcbonet/cry_baby_lite", filename="model.tflite"
        )
        classifier = TFLiteClassifier(
            mel_spectrogram_preprocessing_settings,
            librosa_audio_file_client,
            pathlib.Path(model_path),
        )
        logger.info("Using TensorFlow Lite classifier.")
    else:
        logger.error("No compatible TensorFlow or TensorFlow Lite installation found.")
        return

    run_continously(logger, audio_directory, classifier, repository, librosa_audio_file_client)


if __name__ == "__main__":
    main()
