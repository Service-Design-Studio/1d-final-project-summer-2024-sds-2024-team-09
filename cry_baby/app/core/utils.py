import pathlib
from moviepy.editor import VideoFileClip, concatenate_videoclips
from pydub import AudioSegment
import librosa
import soundfile as sf
import os
import requests

def convert_webm_to_wav(webm_file: pathlib.Path, temp_audio_file_path: pathlib.Path, raw_audio_file_path: pathlib.Path, logger):
    try:
        logger.debug(f"Starting conversion of {webm_file} to WAV")
        video = VideoFileClip(str(webm_file))
        logger.debug(f"Video duration is: {video.duration}")
        audio_temp_file = temp_audio_file_path / f"{webm_file.stem}.mp3"
        video.audio.write_audiofile(str(audio_temp_file))
        
        audio = AudioSegment.from_file(str(audio_temp_file), format="mp3")
        audio.export(str(raw_audio_file_path / f"{audio_temp_file.stem}.wav"), format="wav")
        
        os.remove(audio_temp_file)
        logger.info(f"Conversion complete: {raw_audio_file_path}")
    except Exception as e:
        logger.error(f"Failed to convert {webm_file} to WAV: {e}")

def split_audio_into_chunks(audio_file_path: pathlib.Path, split_audio_file_path: pathlib.Path, chunk_duration: int = 4, logger = None):
    try:
        y, sr = librosa.load(audio_file_path, sr=None)
        duration = librosa.get_duration(y=y, sr=sr)
        chunk_paths = []

        for start in range(0, int(duration), chunk_duration):
            end = min(start + chunk_duration, int(duration))
            chunk = y[start*sr:end*sr]
            chunk_file_path = split_audio_file_path / f"{audio_file_path.stem}_{start}-{end}.wav"
            sf.write(chunk_file_path, chunk, sr)
            chunk_paths.append(chunk_file_path)

        return chunk_paths
    except Exception as e:
        if logger:
            logger.error(f"Failed to split {audio_file_path} into chunks: {e}")
        return []

def evaluate_from_audio_file(audio_file_path: pathlib.Path, classifier, repository, logger):
    try:
        logger.info(f"Evaluating audio file: {audio_file_path}")
        prediction = classifier.classify(audio_file_path)
        logger.debug(f"Prediction for {audio_file_path}: {prediction}")
        repository.save(audio_file_path, prediction)
        return prediction
    except Exception as e:
        logger.error(f"Failed to evaluate {audio_file_path}: {e}")
        return 0  # Assuming 0 as the default prediction when evaluation fails

def combine_video(directory: pathlib.Path, start_video: str, end_video: str, logger):
    logger.debug(f"Combining videos from {start_video} to {end_video} in directory {directory}")
    clips = []
    video_files = sorted(directory.glob('*.webm'))
    for file_name in video_files:
        logger.debug(f"Checking file {file_name}")
        if start_video <= file_name.name <= end_video:
            logger.debug(f"Adding {file_name} to clips")
            clip = VideoFileClip(str(file_name))
            clips.append(clip)
            os.remove(file_name)

    if not clips:
        logger.info("No MP4/WEBM videos found in the specified range.")
        return ""

    final_clip = concatenate_videoclips(clips, method="compose")
    output_path = directory / f"{start_video}_to_{end_video}_combined.mp4"
    final_clip.write_videofile(str(output_path), codec='libx264', audio_codec='aac')
    
    return str(output_path)

def send_telegram_message(bot_token: str, chat_id: str, message: str):
    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    data = {
        'chat_id': chat_id,
        'text': message
    }
    response = requests.post(url, json=data)
    return response.json()

def send_telegram_video(bot_token: str, chat_id: str, video_path: str, caption: str = ""):
    url = f"https://api.telegram.org/bot{bot_token}/sendVideo"
    params = {
        'chat_id': chat_id,
        'caption': caption
    }
    with open(video_path, 'rb') as video_file:
        response = requests.post(url, data=params, files={'video': video_file})
    return response.json()


duration = 10
start_video = "Baby_Cry_60-64.mp4"
end_video = "Baby_Cry_60-64.mp4"
# send_telegram_message(os.getenv("TELEGRAM_BOT_TOKEN"), os.getenv("TELEGRAM_CHAT_ID"), "Hello from Cry Baby!")
#send_telegram_video(os.getenv("TELEGRAM_BOT_TOKEN"), os.getenv("TELEGRAM_CHAT_ID"), "/home/mike/cry-baby/audio/cry_videos/Baby_Cry_60-64.mp4_to_Baby_Cry_60-64.mp4_combined.mp4",f"Cry Detected 👶🏻 for {duration}secs from {start_video} to {end_video}")