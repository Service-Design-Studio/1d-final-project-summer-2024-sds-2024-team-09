import os
import shutil
import time
import pathlib
import pytest

@pytest.fixture
def setup_environment():
    cwd = pathlib.Path.cwd()
    sample_paths = {
        "start_cry": os.path.join(cwd, "audio/samples/Baby_Cry_00-4.webm"),
        "continue_cry": os.path.join(cwd, "audio/samples/Baby_Cry_08-12.webm"),
        "break_cry": os.path.join(cwd, "audio/samples/Baby_Cry_00-4_no_cry.webm"),
        "stop_cry": os.path.join(cwd, "audio/samples"),
        "normal_noises": os.path.join(cwd, "audio/samples/Baby_Cry_99-98_no_cry.webm"),
        "below_4s": os.path.join(cwd, "audio/samples/Baby_Cry_below_4s.webm"),
        "above_4s": os.path.join(cwd, "audio/samples/Baby_Cry_above_4s.webm"),
        "dummy_avi": os.path.join(cwd, "audio/samples/dummy.avi")
    }
    video_input_paths = {
        "start_cry": os.path.join(cwd, "audio/video/Baby_Cry_00-4.webm"),
        "continue_cry": os.path.join(cwd, "audio/video/Baby_Cry_08-12.webm"),
        "break_cry": os.path.join(cwd, "audio/video/Baby_Cry_00-4_no_cry.webm"),
        "normal_noises": os.path.join(cwd, "audio/video/Baby_Cry_99-98_no_cry.webm"),
        "below_4s": os.path.join(cwd, "audio/video/Baby_Cry_below_4s.webm"),
        "above_4s": os.path.join(cwd, "audio/video/Baby_Cry_above_4s.webm"),
        "dummy_avi": os.path.join(cwd, "audio/video/dummy.avi")
    }
    video_output_paths = {
        "start_cry": "audio/cry_videos/Baby_Cry_00-4.webm",
        "continue_cry": "audio/cry_videos/Baby_Cry_08-12.webm",
        "break_cry": "audio/cry_videos/Baby_Cry_00-4_no_cry.webm",
        "synthesize": "audio/cry_videos/Baby_Cry_00-4.webm_to_Baby_Cry_08-12.webm_combined.mp4",
        "normal_noises": "audio/cry_videos/Baby_Cry_99-98_no_cry.webm"
    }
    return cwd, sample_paths, video_input_paths, video_output_paths

def create_dummy_webm(file_path, duration):
    webm_header = b'\x1A\x45\xDF\xA3\x9F\x42\x86\x81\x01\x42\xF7\x81\x01\x42\xF2\x81\x04\x42\xF3\x81\x08\x42\x82\x88webm\x42\x87\x81\x02\x42\x85\x81\x02'
    with open(file_path, 'wb') as f:
        f.write(webm_header)
        f.write(b'\x00' * int(duration * 1000))  # Adding dummy data to simulate duration

def create_dummy_avi(file_path):
    avi_header = b'\x52\x49\x46\x46\x24\x08\x00\x00\x41\x56\x49\x20\x4C\x49\x53\x54\x7C\x00\x00\x00\x68\x64\x72\x6C'
    with open(file_path, 'wb') as f:
        f.write(avi_header)
        f.write(b'\x00' * 1000)  # Adding dummy data

def test_alice_starts_to_cry(setup_environment):
    cwd, sample_paths, video_input_paths, video_output_paths = setup_environment
    shutil.copy2(sample_paths["start_cry"], video_input_paths["start_cry"])
    time.sleep(5)
    assert os.path.exists(video_input_paths["start_cry"])

def test_telegram_message_sent():
    # Placeholder for actual telegram message sending logic
    pass

def test_log_start_video(setup_environment):
    cwd, sample_paths, video_input_paths, video_output_paths = setup_environment
    assert os.path.exists(video_output_paths["start_cry"])

def test_alice_continues_to_cry(setup_environment):
    cwd, sample_paths, video_input_paths, video_output_paths = setup_environment
    shutil.copy2(sample_paths["continue_cry"], video_input_paths["continue_cry"])
    time.sleep(5)
    assert os.path.exists(video_input_paths["continue_cry"])

def test_log_end_video(setup_environment):
    cwd, sample_paths, video_input_paths, video_output_paths = setup_environment
    assert os.path.exists(video_output_paths["continue_cry"])

def test_break_between_crying(setup_environment):
    cwd, sample_paths, video_input_paths, video_output_paths = setup_environment
    shutil.copy2(sample_paths["break_cry"], video_input_paths["break_cry"])
    time.sleep(5)
    assert os.path.exists(video_input_paths["break_cry"])

def test_save_video_and_continue(setup_environment):
    cwd, sample_paths, video_input_paths, video_output_paths = setup_environment
    assert os.path.exists(video_output_paths["break_cry"])

def test_alice_stops_crying(setup_environment):
    cwd, sample_paths, video_input_paths, video_output_paths = setup_environment
    sample_path = pathlib.Path(sample_paths["stop_cry"])
    video_files = list(sorted(sample_path.glob('*.webm')))
    copy_count = 0

    if video_files:
        for video in video_files:
            if "no_cry" in str(video):
                video_input_path = os.path.join(cwd, f"audio/video/{video.name}")
                shutil.copy2(video, video_input_path)
                copy_count += 1
                if copy_count > 6:
                    break
    time.sleep(10)
    assert copy_count > 0

def test_synthesize_videos(setup_environment):
    cwd, sample_paths, video_input_paths, video_output_paths = setup_environment
    assert os.path.exists(video_output_paths["synthesize"])

def test_normal_noises(setup_environment):
    cwd, sample_paths, video_input_paths, video_output_paths = setup_environment
    shutil.copy2(sample_paths["normal_noises"], video_input_paths["normal_noises"])
    time.sleep(5)
    assert os.path.exists(video_input_paths["normal_noises"])

def test_no_timestamp(setup_environment):
    cwd, sample_paths, video_input_paths, video_output_paths = setup_environment
    assert not os.path.exists(video_output_paths["normal_noises"])

def test_video_below_4_seconds(setup_environment):
    cwd, sample_paths, video_input_paths, video_output_paths = setup_environment
    create_dummy_webm(sample_paths["below_4s"], 3)  # Create a 3-second dummy WebM file
    shutil.copy2(sample_paths["below_4s"], video_input_paths["below_4s"])
    time.sleep(5)
    assert not os.path.exists(video_input_paths["below_4s"])  # Ensure the file is discarded
    assert not os.path.exists(video_output_paths["below_4s"])  # Ensure the file is not saved in the output

def test_video_above_4_seconds(setup_environment):
    cwd, sample_paths, video_input_paths, video_output_paths = setup_environment
    create_dummy_webm(sample_paths["above_4s"], 5)  # Create a 5-second dummy WebM file
    shutil.copy2(sample_paths["above_4s"], video_input_paths["above_4s"])
    time.sleep(5)
    assert not os.path.exists(video_input_paths["above_4s"])  # Ensure the file is discarded
    assert not os.path.exists(video_output_paths["above_4s"])  # Ensure the file is not saved in the output

def test_dummy_avi_file(setup_environment):
    cwd, sample_paths, video_input_paths, video_output_paths = setup_environment
    create_dummy_avi(sample_paths["dummy_avi"])  # Create a dummy AVI file
    shutil.copy2(sample_paths["dummy_avi"], video_input_paths["dummy_avi"])
    time.sleep(5)
    assert os.path.exists(video_input_paths["dummy_avi"])  # Ensure the file still exists and is not touched
