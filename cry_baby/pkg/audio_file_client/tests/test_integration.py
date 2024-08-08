import pytest
import pathlib
import shutil
from unittest.mock import MagicMock, patch
import os
from moviepy.editor import VideoFileClip
from cry_baby.app.core.service import CryBabyService

@pytest.fixture
def setup_environment(tmp_path):
    video_file_path = tmp_path / "video"
    raw_audio_file_path = tmp_path / "raw_audio"
    temp_audio_file_path = tmp_path / "temp_audio"
    split_audio_file_path = tmp_path / "split_audio"
    cry_video_file_path = tmp_path / "cry_videos"
    video_file_path.mkdir()
    raw_audio_file_path.mkdir()
    temp_audio_file_path.mkdir()
    split_audio_file_path.mkdir()
    cry_video_file_path.mkdir()
    return video_file_path, raw_audio_file_path, temp_audio_file_path, split_audio_file_path, cry_video_file_path

@pytest.fixture
def cry_baby_service(setup_environment):
    video_file_path, raw_audio_file_path, temp_audio_file_path, split_audio_file_path, cry_video_file_path = setup_environment
    logger = MagicMock()
    classifier = MagicMock()
    repository = MagicMock()
    audio_file_client = MagicMock()
    telegram_bot_token = "dummy_token"
    telegram_chat_id = "dummy_chat_id"

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
        telegram_chat_id=telegram_chat_id
    )

def test_convert_and_split_audio(cry_baby_service, setup_environment):
    video_file_path, temp_audio_file_path, raw_audio_file_path = setup_environment
    webm_file = video_file_path / "test_video.webm"

    with open(webm_file, 'wb') as f:
        f.write(b'\x1A\x45\xDF\xA3\x9F\x42\x86\x81\x01\x42\xF7\x81\x01\x42\xF2\x81\x04\x42\xF3\x81\x08\x42\x82\x88webm\x42\x87\x81\x02\x42\x85\x81\x02')

    with patch("cry_baby.app.core.utils.VideoFileClip") as mock_video_clip, patch("cry_baby.app.core.utils.AudioSegment") as mock_audio_segment, patch("cry_baby.app.core.utils.split_audio_into_chunks") as mock_split:
        mock_video = MagicMock()
        mock_audio = MagicMock()
        mock_video.audio = MagicMock()
        mock_video.audio.write_audiofile.return_value = None
        mock_video_clip.return_value = mock_video
        mock_audio_segment.from_file.return_value = mock_audio

        cry_baby_service.convert_webm_to_wav(webm_file, temp_audio_file_path, raw_audio_file_path)
        mock_split.return_value = [raw_audio_file_path / "chunk1.wav"]

        chunks = cry_baby_service.split_audio_into_chunks(raw_audio_file_path / "test_video.wav")

        assert mock_video.audio.write_audiofile.called
        assert mock_audio.export.called
        assert mock_split.called
        assert len(chunks) > 0

def test_evaluate_and_combine_video(cry_baby_service, setup_environment):
    cry_video_file_path = setup_environment[4]

    with patch("cry_baby.app.core.utils.evaluate_from_audio_file") as mock_evaluate, patch("cry_baby.app.core.utils.combine_video") as mock_combine:
        mock_evaluate.return_value = 0.9
        mock_combine.return_value = "combined_video.mp4"

        cry_baby_service.evaluate_from_audio_file(pathlib.Path("dummy_path.wav"))
        combined_video_name = cry_baby_service.combine_video(cry_video_file_path, "start_video.webm", "end_video.webm")

        assert mock_evaluate.called
        assert mock_combine.called
        assert combined_video_name == "combined_video.mp4"

def test_process_videos_and_send_notification(cry_baby_service, setup_environment):
    video_file_path = setup_environment[0]
    cry_video_file_path = setup_environment[4]

    with patch("cry_baby.app.core.utils.convert_webm_to_wav") as mock_convert, \
         patch("cry_baby.app.core.utils.evaluate_from_audio_file") as mock_evaluate, \
         patch("cry_baby.app.core.utils.send_telegram_message") as mock_send_message, \
         patch("shutil.move") as mock_shutil_move:

        mock_evaluate.return_value = 0.9

        # Simulate video files
        for i in range(2):
            webm_file = video_file_path / f"test_video_{i}.webm"
            with open(webm_file, 'wb') as f:
                f.write(b'\x1A\x45\xDF\xA3\x9F\x42\x86\x81\x01\x42\xF7\x81\x01\x42\xF2\x81\x04\x42\xF3\x81\x08\x42\x82\x88webm\x42\x87\x81\x02\x42\x85\x81\x02')

        cry_baby_service.continuously_evaluate_from_directory()

        assert mock_convert.called
        assert mock_evaluate.called
        assert mock_send_message.called
        assert mock_shutil_move.called

def test_complete_video_processing_and_upload(cry_baby_service, setup_environment):
    cry_video_file_path = setup_environment[4]

    with patch("cry_baby.app.core.utils.combine_video") as mock_combine, \
         patch("cry_baby.app.core.utils.send_telegram_video") as mock_send_video, \
         patch("cry_baby.pkg.upload_video.upload_video_sql.upload_to_gcs") as mock_upload_to_gcs, \
         patch("moviepy.editor.VideoFileClip") as mock_videoclip, \
         patch("cry_baby.app.core.utils.VideoFileClip") as mock_video_clip, \
         patch("cry_baby.app.core.utils.AudioSegment") as mock_audio_segment, \
         patch("cry_baby.app.core.utils.split_audio_into_chunks") as mock_split:

        mock_combine.return_value = "combined_video.mp4"
        mock_send_video.return_value = {"ok": True}
        mock_videoclip.return_value.duration = 10

        combined_video_name = cry_baby_service.combine_video(cry_video_file_path, "start_video.webm", "end_video.webm")
        cry_baby_service.upload_to_gcs_service(combined_video_name)

        assert mock_combine.called
        assert mock_send_video.called
        assert mock_upload_to_gcs.called
        assert mock_video_clip.called
        assert mock_audio_segment.called
        assert mock_split.called
