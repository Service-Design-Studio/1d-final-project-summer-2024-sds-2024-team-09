import os
import unittest
from unittest.mock import MagicMock, patch, mock_open, call
import pathlib
import requests_mock
import hexalog.ports
from cry_baby.app.core.utils import (
    convert_webm_to_wav, 
    split_audio_into_chunks, 
    evaluate_from_audio_file, 
    combine_video, 
    send_telegram_message,
    send_telegram_video
)

class TestUtils(unittest.TestCase):

    def setUp(self):
        self.logger = MagicMock(spec=hexalog.ports.Logger)
        self.classifier = MagicMock()
        self.repository = MagicMock()
        test_audio_directory = pathlib.Path(os.getenv("TEST_AUDIO_DIR", "/fake/test_audio_dir"))
        self.sample_file_path = test_audio_directory / "samples"
        
    @patch("cry_baby.app.core.utils.os.remove")
    @patch("cry_baby.app.core.utils.VideoFileClip")
    @patch("cry_baby.app.core.utils.AudioSegment")
    def test_convert_webm_to_wav(self, mock_audio_segment, mock_video_file_clip, mock_os_remove):
        mock_video = mock_video_file_clip.return_value
        mock_audio = mock_audio_segment.from_file.return_value

        webm_file = pathlib.Path("/fake/video/path/video.webm")
        temp_audio_file_path = pathlib.Path("/fake/temp/audio/path")
        raw_audio_file_path = pathlib.Path("/fake/raw/audio/path")

        convert_webm_to_wav(webm_file, temp_audio_file_path, raw_audio_file_path, self.logger)

        mock_video_file_clip.assert_called_once_with(str(webm_file))
        mock_video.audio.write_audiofile.assert_called_once_with(str(temp_audio_file_path / f"{webm_file.stem}.mp3"))
        mock_audio_segment.from_file.assert_called_once_with(str(temp_audio_file_path / f"{webm_file.stem}.mp3"), format="mp3")
        mock_audio.export.assert_called_once_with(str(raw_audio_file_path / f"{webm_file.stem}.wav"), format="wav")
        mock_os_remove.assert_called_once_with(temp_audio_file_path / f"{webm_file.stem}.mp3")
        self.logger.info.assert_called_once_with(f"Conversion complete: {raw_audio_file_path}")
        self.logger.error.assert_not_called()

    @patch("cry_baby.app.core.utils.sf.write")
    @patch("cry_baby.app.core.utils.librosa.load")
    @patch("cry_baby.app.core.utils.librosa.get_duration")
    def test_split_audio_into_chunks(self, mock_get_duration, mock_load, mock_sf_write):
        mock_load.return_value = (MagicMock(), 22050)
        mock_get_duration.return_value = 10  # 10 seconds duration

        audio_file_path = pathlib.Path("/fake/raw/audio/path/audio.wav")
        split_audio_file_path = pathlib.Path("/fake/split/audio/path")
        chunk_paths = split_audio_into_chunks(audio_file_path, split_audio_file_path, chunk_duration=4, logger=self.logger)

        expected_calls = [
            call(split_audio_file_path / "audio_0-4.wav", mock_load.return_value[0][:4*22050], 22050),
            call(split_audio_file_path / "audio_4-8.wav", mock_load.return_value[0][4*22050:8*22050], 22050),
            call(split_audio_file_path / "audio_8-10.wav", mock_load.return_value[0][8*22050:], 22050)
        ]
        mock_sf_write.assert_has_calls(expected_calls, any_order=True)

    def test_evaluate_from_audio_file(self):
        audio_file_path = pathlib.Path("/fake/raw/audio/path/audio.wav")
        self.classifier.classify.return_value = 0.9

        prediction = evaluate_from_audio_file(audio_file_path, self.classifier, self.repository, self.logger)

        self.assertEqual(prediction, 0.9)
        self.repository.save.assert_called_once_with(audio_file_path, 0.9)

    @patch("cry_baby.app.core.utils.VideoFileClip")
    @patch("cry_baby.app.core.utils.concatenate_videoclips")
    def test_combine_video(self, mock_concatenate_videoclips, mock_video_file_clip):
        mock_video = mock_video_file_clip.return_value
        mock_concatenate_videoclips.return_value = mock_video

        start_video = "video1.webm"
        end_video = "video3.webm"

        # Create fake files in the directory
        for i in range(1, 4):
            file_path = self.sample_file_path / f"video{i}.webm"
            with open(file_path, 'w') as f:
                f.write("fake content")

        combined_video_path = combine_video(self.sample_file_path, start_video, end_video, self.logger)

        mock_concatenate_videoclips.assert_called_once()
        mock_video.write_videofile.assert_called_once()
        self.assertIn(start_video, combined_video_path)
        self.assertIn(end_video, combined_video_path)

class TestSendTelegramFunctions(unittest.TestCase):

    @requests_mock.Mocker()
    def test_send_telegram_message(self, mock_request):
        bot_token = "fake_bot_token"
        chat_id = "fake_chat_id"
        message = "Test message"
        expected_url = f"https://api.telegram.org/bot{bot_token}/sendMessage?chat_id={chat_id}&text={message}"

        mock_response = {
            "ok": True,
            "result": {
                "message_id": 123,
                "chat": {
                    "id": chat_id,
                    "first_name": "Test",
                    "username": "test_bot",
                    "type": "private"
                },
                "date": 1653672972,
                "text": message
            }
        }
        
        mock_request.get(expected_url, json=mock_response)

        response = send_telegram_message(bot_token, chat_id, message)
        
        self.assertTrue(response["ok"])
        self.assertEqual(response["result"]["chat"]["id"], chat_id)
        self.assertEqual(response["result"]["text"], message)

    @requests_mock.Mocker()
    @patch("builtins.open", new_callable=mock_open, read_data=b"fake video content")
    def test_send_telegram_video(self, mock_request, mock_file):
        bot_token = "fake_bot_token"
        chat_id = "fake_chat_id"
        video_path = "fake_video_path"
        caption = "fake_caption"
        
        url = f"https://api.telegram.org/bot{bot_token}/sendVideo"
        
        mock_response = {
            "ok": True,
            "result": {
                "message_id": 123,
                "chat": {
                    "id": chat_id,
                    "first_name": "Test",
                    "username": "test_bot",
                    "type": "private"
                },
                "date": 1653672972,
                "video": {
                    "duration": 1,
                    "mime_type": "video/mp4",
                    "file_id": "fake_file_id",
                    "file_unique_id": "fake_file_unique_id",
                    "file_size": 12345
                },
                "caption": caption
            }
        }
        
        mock_request.post(url, json=mock_response)

        response = send_telegram_video(bot_token, chat_id, video_path, caption)
        
        self.assertTrue(response["ok"])
        self.assertEqual(response["result"]["chat"]["id"], chat_id)
        self.assertEqual(response["result"]["caption"], caption)
        self.assertEqual(response["result"]["video"]["file_id"], "fake_file_id")
        
        mock_file.assert_called_with(video_path, 'rb')

if __name__ == "__main__":
    unittest.main()

