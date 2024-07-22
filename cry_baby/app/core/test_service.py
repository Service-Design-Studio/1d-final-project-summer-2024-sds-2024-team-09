import pathlib
import pytest
from unittest.mock import MagicMock

from cry_baby.app.core.service import CryBabyService


@pytest.fixture
def cry_baby_service():
    # Mock dependencies
    logger = MagicMock()
    classifier = MagicMock()
    video_file_path = pathlib.Path("/path/to/video/files")
    raw_audio_file_path = pathlib.Path("/path/to/raw/audio/files")
    temp_audio_file_path = pathlib.Path("/path/to/temp/audio/files")
    split_audio_file_path = pathlib.Path("/path/to/split/audio/files")
    cry_video_file_path = pathlib.Path("/path/to/cry/video/files")
    repository = MagicMock()
    audio_file_client = MagicMock()
    telegram_bot_token = "TOKEN"
    telegram_chat_id = "CHAT_ID"

    return CryBabyService(
        logger=logger,
        classifier=classifier,
        video_file_path=video_file_path,
        raw_audio_file_path=raw_audio_file_path,
        temp_audio_file_path=temp_audio_file_path,
        split_audio_file_path=split_audio_file_path,
        cry_video_file_path=cry_video_file_path,
        repository=repository,
        audio_file_client=audio_file_client,
        telegram_bot_token=telegram_bot_token,
        telegram_chat_id=telegram_chat_id,
    )


def test_convert_webm_to_wav(cry_baby_service):
    webm_file = pathlib.Path("/path/to/video.webm")
    cry_baby_service.convert_webm_to_wav(webm_file)

    # Assert that the necessary methods are called
    cry_baby_service.logger.info.assert_called_with(f"Conversion complete: {cry_baby_service.raw_audio_file_path}")
    cry_baby_service.logger.error.assert_not_called()


def test_split_audio_into_chunks(cry_baby_service):
    audio_file_path = pathlib.Path("/path/to/audio.wav")
    chunk_duration = 4
    chunk_paths = cry_baby_service.split_audio_into_chunks(audio_file_path, chunk_duration)

    # Assert that the necessary methods are called
    cry_baby_service.logger.error.assert_not_called()

    # Assert the returned chunk paths
    assert isinstance(chunk_paths, list)
    assert all(isinstance(chunk_path, pathlib.Path) for chunk_path in chunk_paths)


def test_evaluate_from_audio_file(cry_baby_service):
    audio_file_path = pathlib.Path("/path/to/audio.wav")
    prediction = cry_baby_service.evaluate_from_audio_file(audio_file_path)

    # Assert that the necessary methods are called
    cry_baby_service.logger.info.assert_called_with(f"Evaluating audio file: {audio_file_path}")
    cry_baby_service.logger.debug.assert_called()
    cry_baby_service.repository.save.assert_called()
    cry_baby_service.logger.error.assert_not_called()

    # Assert the returned prediction
    assert isinstance(prediction, int)


def test_combine_video(cry_baby_service):
    directory = pathlib.Path("/path/to/videos")
    start_video = "video1.mp4"
    end_video = "video2.mp4"
    combined_video_path = cry_baby_service.combine_video(directory, start_video, end_video)

    # Assert that the necessary methods are called
    cry_baby_service.logger.info.assert_called_with("No MP4 videos found in the specified range.")
    cry_baby_service.logger.error.assert_not_called()

    # Assert the returned combined video path
    assert isinstance(combined_video_path, str)


def test_upload_to_gcs_service(cry_baby_service):
    combined_video_name = "combined_video.mp4"
    cry_baby_service.upload_to_gcs_service(combined_video_name)

    # Assert that the necessary methods are called
    cry_baby_service.logger.info.assert_called_with("10 reached")
    cry_baby_service.logger.error.assert_not_called()
    cry_baby_service.cry_idle_counter = 0
    cry_baby_service.start_video = ""
    cry_baby_service.end_video = ""
    cry_baby_service.cry_video_file_path.iterdir.assert_called()


def test_continuously_evaluate_from_directory(cry_baby_service):
    cry_baby_service.convert_webm_to_wav = MagicMock()
    cry_baby_service.evaluate_from_audio_file = MagicMock()
    cry_baby_service.combine_video = MagicMock()
    cry_baby_service.upload_to_gcs_service = MagicMock()

    cry_baby_service.continuously_evaluate_from_directory()

    # Assert that the necessary methods are called
    cry_baby_service.convert_webm_to_wav.assert_called()
    cry_baby_service.evaluate_from_audio_file.assert_called()
    cry_baby_service.combine_video.assert_called()
    cry_baby_service.upload_to_gcs_service.assert_called()
    cry_baby_service.logger.error.assert_not_called()


def test_stop_continuous_evaluation(cry_baby_service):
    cry_baby_service.stop_continuous_evaluation()

    # Assert that the necessary methods are called
    cry_baby_service.logger.info.assert_called_with("Service stopping continuous evaluation")
    SHUTDOWN_EVENT.set.assert_called()