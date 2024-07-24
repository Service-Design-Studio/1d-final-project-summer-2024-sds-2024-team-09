# upload_video.py
from google.cloud import storage
from databases import Database
# from database import SessionLocal, Video
from datetime import datetime

def upload_to_gcs(bucket_name, source_file_name, destination_blob_name, video_metadata):
    """Uploads a file to the bucket and records metadata in the database."""
    # Initialize a storage client
    storage_client = storage.Client.from_service_account_json("jya-keyfile.json")

    # Get the bucket that the file will be uploaded to
    bucket = storage_client.bucket(bucket_name)

    # Create a blob object from the bucket
    blob = bucket.blob(destination_blob_name)

    # Upload the file to the blrecording_2024-07-17T15-08-20-561998Z.webmrecording_2024-07-17T15-08-20-561998Z.webmrecording_2024-07-17T15-08-20-561998Z.webmob
    blob.upload_from_filename(source_file_name)

    print(f"File {source_file_name} uploaded to {destination_blob_name}.")

    # Record metadata in the database
    session = Database.SessionLocal()
    video = Database.Video(
        title=video_metadata["title"],
        file_path=destination_blob_name,
        duration=video_metadata["duration"],
        user_id=video_metadata["user_id"],
        recorded_at=video_metadata["recorded_at"],
        is_critical=video_metadata.get("is_critical", False),
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    session.add(video)
    session.commit()
    session.close()
    print(f"Metadata for {source_file_name} recorded in the database.")

# Usage example:
bucket_name = 'video-upload-jya'  # Replace with your bucket name
source_file_name = '/home/mike/cry-baby-edited/cry-baby/audio/samples/recording_2024-07-23T07-24-44-438Z.webm'  # Replace with the path to your video file
destination_blob_name = 'AItest_upload/hello.webm'  # Replace with the destination path in the bucket

# Video metadata
video_metadata = {
    "title": "Test Video",
    "duration": 120,  # Duration in seconds
    "user_id": 1,
    "recorded_at": datetime(2023, 7, 23, 10, 0, 0),
    "is_critical": False
}

upload_to_gcs(bucket_name, source_file_name, destination_blob_name, video_metadata)
