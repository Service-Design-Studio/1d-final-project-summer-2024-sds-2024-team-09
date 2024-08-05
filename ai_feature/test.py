from moviepy.editor import VideoFileClip
import pathlib
import os

def convert_mp4_to_webm(directory: pathlib.Path):
    mp4_files = directory.glob('*.mp4')

    for file_name in mp4_files:
        try:
            # Load the MP4 video file
            clip = VideoFileClip(str(file_name))
            
            # Define the output path with .webm extension
            output_path = file_name.with_suffix('.webm')
            
            # Write the video file in WEBM format
            clip.write_videofile(
                str(output_path),
                codec='libvpx',
                audio_codec='libvorbis'
            )
            
            # Close the clip to free resources
            clip.close()
            
            # Optionally, remove the original MP4 file after conversion
            os.remove(file_name)
            print(f"Converted {file_name} to {output_path}")
        except Exception as e:
            print(f"Failed to convert {file_name}: {e}")

# Usage example
directory_path = pathlib.Path('/home/g1006632/Desktop/cry-baby/audio/samples')  # Change this to your directory path
convert_mp4_to_webm(directory_path)