from moviepy.editor import VideoFileClip
from pathlib import Path
from typing import List

def split_video_into_clips(video_file_path: Path, clip_duration: int = 4) -> List[Path]:
    """
    Split a video file into clips of specified duration (in seconds).
    
    Args:
    video_file_path (Path): Path to the input video file.
    clip_duration (int): Duration of each clip in seconds.
    
    Returns:
    List[Path]: List of paths to the generated clip files.
    """
    try:
        # Load the video file
        video = VideoFileClip(str(video_file_path))
        duration = video.duration
        clip_paths = []

        # Generate clips
        for start_time in range(0, int(duration), clip_duration):
            end_time = min(start_time + clip_duration, duration)
            clip = video.subclip(start_time, end_time)
            clip_file_path = video_file_path.parent / f"{video_file_path.stem}_{start_time}-{end_time}_no_cry.mp4"
            clip.write_videofile(str(clip_file_path), codec='libx264', audio_codec='aac')
            clip_paths.append(clip_file_path)

        return clip_paths
    except Exception as e:
        print(f"Failed to split {video_file_path}: {e}")
        return []

# Example usage
video_file_path = Path("/home/mike/cry-baby/audio/samples/Baby_Cry.mp4")
clip_paths = split_video_into_clips(video_file_path)
print(f"Created clips: {clip_paths}")
