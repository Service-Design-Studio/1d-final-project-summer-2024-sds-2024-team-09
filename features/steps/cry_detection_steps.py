from behave import given, when, then
import time
import os
import shutil
import subprocess
import pathlib

from behave import given, when, then
import time
import os
import shutil
import pathlib
import subprocess

# @given('that the audio input device is operational and monitoring ambient sounds')
# def step_given_audio_input_device(context):
#     assert context.system.is_operational()

@when('Alice starts to cry')
def step_given_alice_crying(context):
    context.cwd = pathlib.Path.cwd()
    context.sample_path = os.path.join(context.cwd, "audio/samples/Baby_Cry_00-4.webm")
    context.video_input_path = os.path.join(context.cwd, "audio/video/Baby_Cry_00-4.webm")
    shutil.copy2(context.sample_path, context.video_input_path)
    time.sleep(5)

@then('a telegram message is sent to the parent')
def step_then_telegram_message_sent(context):
    pass

@then('the first cry is logged as the start video and saved for video synthesis')
def step_then_log_start_video(context):
    context.start_video_path = "audio/cry_videos/Baby_Cry_00-4.webm"
    assert os.path.exists(context.start_video_path)

@when('Alice continues to cry')
def step_given_alice_continues_to_cry(context):
    context.cwd = pathlib.Path.cwd()
    context.sample_path = os.path.join(context.cwd, "audio/samples/Baby_Cry_08-12.webm")
    context.video_input_path = os.path.join(context.cwd, "audio/video/Baby_Cry_08-12.webm")
    shutil.copy2(context.sample_path, context.video_input_path)
    time.sleep(5)

@then('the last cry is logged as the end video for video synthesis')
def step_then_log_end_video(context):
    context.end_video_path = "audio/cry_videos/Baby_Cry_08-12.webm"
    assert os.path.exists(context.end_video_path)

@when('there is a break between the crying')
def step_given_break_between_crying(context):
    context.cwd = pathlib.Path.cwd()
    context.sample_path = os.path.join(context.cwd, "audio/samples/Baby_Cry_00-4_no_cry.webm")
    context.video_input_path = os.path.join(context.cwd, "audio/video/Baby_Cry_00-4_no_cry.webm")
    shutil.copy2(context.sample_path, context.video_input_path)
    time.sleep(5)

@then('the system saves that video as well and continues to detect for cries')
def step_then_save_video_and_continue(context):
    context.break_video_path = "audio/cry_videos/Baby_Cry_00-4_no_cry.webm"
    assert os.path.exists(context.break_video_path)

@when('Alice stops crying after falling')
def step_given_alice_stops_crying(context):
    context.cwd = pathlib.Path.cwd()
    sample_path = pathlib.Path(os.path.join(context.cwd, "audio/samples"))
    video_files = list(sorted(sample_path.glob('*.webm')))
    copy_count = 0

    if video_files:
        for video in video_files:
            if "no_cry" in str(video):
                context.video_input_path = os.path.join(context.cwd, f"audio/video/{video.name}")
                shutil.copy2(video, context.video_input_path)
                copy_count += 1
                if copy_count > 6:
                    break
    time.sleep(10)
    
@then('the system starts to synthesize all videos (cry and no cry) from start video to end video')
def step_then_synthesize_videos(context):
    context.break_video_path = "audio/cry_videos/Baby_Cry_00-4.webm_to_Baby_Cry_08-12.webm_combined.mp4"
    assert os.path.exists(context.break_video_path)

@when('the children are playing and making loud but non-distressful noises')
def step_given_normal_noises(context):
    context.cwd = pathlib.Path.cwd()
    context.sample_path = os.path.join(context.cwd, "audio/samples/Baby_Cry_99-98_no_cry.webm")
    context.video_input_path = os.path.join(context.cwd, "audio/video/Baby_Cry_99-98_no_cry.webm")
    shutil.copy2(context.sample_path, context.video_input_path)
    time.sleep(5)

@then('the video is discarded')
def step_then_no_timestamp(context):
    context.break_video_path = "audio/cry_videos/Baby_Cry_99-98_no_cry.webm"
    assert not os.path.exists(context.break_video_path)
