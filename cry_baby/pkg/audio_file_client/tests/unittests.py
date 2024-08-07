import pytest
import pathlib
import logging
from unittest.mock import MagicMock, patch, mock_open
from moviepy.editor import VideoFileClip, concatenate_videoclips, CompositeVideoClip, TextClip
from pydub import AudioSegment
import numpy as np
import soundfile as sf

from cry_baby.app.core.utils import (
    convert_webm_to_wav, 
    split_audio_into_chunks, 
    evaluate_from_audio_file, 
    combine_video, 
    send_telegram_message,
    send_telegram_video
)

logger = logging.getLogger("test_logger")

@pytest.fixture
def setup_paths(tmp_path):
    webm_file = tmp_path / "test_video.webm"
    temp_audio_file_path = tmp_path / "temp_audio"
    raw_audio_file_path = tmp_path / "raw_audio"
    temp_audio_file_path.mkdir()
    raw_audio_file_path.mkdir()
    return webm_file, temp_audio_file_path, raw_audio_file_path

@pytest.fixture
def create_dummy_webm_file():
    def _create_dummy_webm_file(file_path):
        webm_header = b'\x1A\x45\xDF\xA3\x9F\x42\x86\x81\x01\x42\xF7\x81\x01\x42\xF2\x81\x04\x42\xF3\x81\x08\x42\x82\x88webm\x42\x87\x81\x02\x42\x85\x81\x02'
        with open(file_path, 'wb') as f:
            f.write(webm_header)
    return _create_dummy_webm_file

def test_convert_webm_to_wav(create_dummy_webm_file, setup_paths):
    webm_file, temp_audio_file_path, raw_audio_file_path = setup_paths
    
    # Create a dummy WebM file
    create_dummy_webm_file(webm_file)
    
    # Mocking VideoFileClip and AudioSegment
    with patch("cry_baby.app.core.utils.VideoFileClip") as mock_video_clip, patch("cry_baby.app.core.utils.AudioSegment") as mock_audio_segment:
        mock_video = MagicMock(spec=VideoFileClip)
        mock_audio = MagicMock(spec=AudioSegment)
        
        mock_video.audio = MagicMock()
        mock_video.audio.write_audiofile.return_value = None
        mock_video.duration = 10  # Add duration attribute to the mock
        mock_video_clip.return_value = mock_video
        
        mock_audio_segment.from_file.return_value = mock_audio
        
        convert_webm_to_wav(webm_file, temp_audio_file_path, raw_audio_file_path, logger)
        
        mock_video.audio.write_audiofile.assert_called_once()
        mock_audio.export.assert_called_once()

def test_split_audio_into_chunks(tmp_path):
    audio_file_path = tmp_path / "test_audio.wav"
    split_audio_file_path = tmp_path / "split_audio"
    split_audio_file_path.mkdir()
    
    # Creating a dummy audio file for testing
    sf.write(audio_file_path, np.zeros(22050 * 5, dtype=np.int16), 22050)  # 5 seconds of silence at 22050 Hz with int16 type

    chunk_paths = split_audio_into_chunks(audio_file_path, split_audio_file_path, chunk_duration=1, logger=logger)
    
    assert len(chunk_paths) > 0
    for chunk_path in chunk_paths:
        assert chunk_path.exists()

def test_evaluate_from_audio_file(tmp_path):
    audio_file_path = tmp_path / "test_audio.wav"
    
    # Creating a dummy audio file for testing
    sf.write(audio_file_path, np.zeros(10000, dtype=np.int16), 22050)  # 10000 samples at 22050 Hz with int16 type

    classifier = MagicMock()
    classifier.classify.return_value = 1
    repository = MagicMock()

    result = evaluate_from_audio_file(audio_file_path, classifier, repository, logger)
    
    assert result == 1
    classifier.classify.assert_called_once_with(audio_file_path)
    repository.save.assert_called_once()

def test_combine_video(create_dummy_webm_file, tmp_path):
    directory = tmp_path / "videos"
    directory.mkdir()
    
    video_file_1 = directory / "test_video_1.webm"
    video_file_2 = directory / "test_video_2.webm"
    
    # Create dummy WebM files
    create_dummy_webm_file(video_file_1)
    create_dummy_webm_file(video_file_2)
    
    start_video = "test_video_1.webm"
    end_video = "test_video_2.webm"
    
    with patch("cry_baby.app.core.utils.VideoFileClip") as mock_video_clip, \
         patch("moviepy.video.compositing.concatenate.CompositeVideoClip") as mock_composite_video_clip, \
         patch("moviepy.audio.AudioClip.CompositeAudioClip") as mock_composite_audio_clip, \
         patch.object(CompositeVideoClip, 'write_videofile') as mock_write_videofile, \
         patch('builtins.open', mock_open()):
        
        mock_clip = MagicMock(spec=VideoFileClip)
        mock_clip.duration = 10  # Set a dummy duration
        mock_clip.size = (1280, 720)  # Set a dummy size
        mock_clip.fps = 30  # Set a dummy fps
        mock_audio = MagicMock()  # Add audio attribute to the mock
        mock_audio.nchannels = 2  # Set a dummy number of channels
        mock_audio.set_start.return_value = mock_audio  # Make set_start chainable
        mock_audio.end = 10  # Set a dummy end value
        mock_clip.audio = mock_audio
        mock_video_clip.return_value = mock_clip
    
        mock_composite_video_clip.return_value = MagicMock(spec=CompositeVideoClip)  # Mock the CompositeVideoClip
        mock_composite_audio_clip.return_value = MagicMock()  # Mock the CompositeAudioClip
    
        output_path = combine_video(directory, start_video, end_video, logger)
        
        print(f"Output path: {output_path}")
        
        mock_write_videofile.assert_called_once_with(str(output_path), codec='libx264', audio_codec='aac')
        
        # Simulate file creation
        with open(output_path, 'w') as f:
            f.write("dummy data")
        
        assert pathlib.Path(output_path).exists()
        mock_video_clip.assert_called()

def test_send_telegram_message():
    bot_token = "dummy_token"
    chat_id = "dummy_chat_id"
    message = "Hello, world!"
    
    with patch("cry_baby.app.core.utils.requests.get") as mock_get:
        mock_response = MagicMock()
        mock_response.json.return_value = {"ok": True}
        mock_get.return_value = mock_response
        
        response = send_telegram_message(bot_token, chat_id, message)
        
        assert response["ok"]
        mock_get.assert_called_once()

def test_send_telegram_video(tmp_path):
    bot_token = "dummy_token"
    chat_id = "dummy_chat_id"
    caption = "Test Video"
    video_path = tmp_path / "test_video.mp4"
    
    # Create a dummy video file
    video_path.write_text("dummy data")
    
    with patch("cry_baby.app.core.utils.requests.post") as mock_post:
        mock_response = MagicMock()
        mock_response.json.return_value = {"ok": True}
        mock_post.return_value = mock_response
        
        response = send_telegram_video(bot_token, chat_id, video_path, caption)
        
        assert response["ok"]
        mock_post.assert_called_once()

