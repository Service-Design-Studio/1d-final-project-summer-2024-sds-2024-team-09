from behave import given, when, then
import time
import os
import shutil
import subprocess
import pathlib


@given('the audio input device is operational and monitoring ambient sounds')
def step_given_audio_input_device(context):
    # Initialize the audio input device and start monitoring
    context.audio_device = initialize_detection()
    assert context.audio_device.is_operational()
    

@given('Alice falls')
def step_given_alice_falls(context):
    # Simulate Alice falling (might involve setting a condition or flag)
    context.alice_fallen = True

@given('Alice starts to cry')
def step_given_alice_crying(context):
    # Simulate Alice crying
    context.cwd = pathlib.Path.cwd()
    context.sample_path = os.path.join(context.cwd, "audio/samples/Baby_Cry_00-4.mp4")
    context.video_input_path = os.path.join(context.cwd, "audio/video/Baby_Cry_00-4.mp4")
    shutil.copy2(str(context.sample_path), str(context.video_input_path))

@when('the system detects the first cry')
def step_when_system_detects_first_cry(context):
    # Trigger the system to detect the first cry
    context.prediction = context.system.detect_cry()

@then('the system accurately identifies the cry as a high probability cry')
def step_then_identify_high_probability_cry(context):
    assert context.prediction > 0.8

@then('a telegram message is sent to the parent')
def step_then_telegram_message_sent(context):
    # Check if the message was sent
    assert context.telegram_bot.message_sent()

@then('the first cry is logged as the start video and saved for video synthesis')
def step_then_log_start_video(context):
    # Verify the start video is logged and saved
    context.start_video_path = "audio/cry_videos"
    assert os.path.exists(context.start_video_path)


# Define additional helper functions if needed
def initialize_detection():
    # Replace with actual initialization logic
    return AudioDevice()

class AudioDevice:
    def __init__(self) -> None:
        process = subprocess.Popen(['make', 'run'], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        # Print output from the process as it runs
        try:
            while True:
                output = process.stdout.readline()
                if output:
                    self.output = output.strip()
                err = process.stderr.readline()
                if err:
                    self.error = err.strip()
        except KeyboardInterrupt:
            process.terminate()
            process.wait()
            
    def is_operational(self):
        start_time = time.time()
        while time.time() - start_time < 10:
            if "No audio files to process. Waiting for new files..." in self.output:
                return True
            time.sleep(0.5)  # Polling interval
        return False

    def start_detection(self):
        pass

    def detect_cry(self):
        start_time = time.time()
        while time.time() - start_time < 10:
            if "No audio files to process. Waiting for new files..." in self.output:
                prediction=self.output
                
            time.sleep(0.5)  # Polling interval
        return 0
