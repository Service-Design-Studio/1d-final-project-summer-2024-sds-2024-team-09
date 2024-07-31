# upload_video_sql.py
from google.cloud import storage
from sqlalchemy.orm import Session
from cry_baby.pkg.upload_video.database import SessionLocal, Video
from datetime import datetime, timezone, timedelta

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
    session = SessionLocal()
    try:
        video = Video(
            title=video_metadata["title"],
            file_path=destination_blob_name,
            duration=video_metadata["duration"],
            user_id=video_metadata["user_id"],
            recorded_at=datetime.now(timezone.utc)+ timedelta(hours=8),
            is_critical=video_metadata.get("is_critical", False),
            created_at=datetime.now(timezone.utc)+ timedelta(hours=8),
            updated_at=datetime.now(timezone.utc)+ timedelta(hours=8)
        )
        session.add(video)
        session.commit()
        print(f"Metadata for {source_file_name} recorded in the database.")
    except Exception as e:
        session.rollback()
        print(f"Failed to record metadata: {e}")
    finally:    
        session.close()

# # Usage example:
# bucket_name = 'video-upload-jya'  # Replace with your bucket name
# source_file_name = '/home/g1006632/Desktop/cry-baby/audio/video/recording_2024-07-25T07-44-10-841Z.webm_to_recording_2024-07-25T07-44-30-358Z.webm_combined.mp4'  # Replace with the path to your video file
# destination_blob_name = 'Tiger_cry_try'  # Replace with the destination path in the bucket AItest_upload/

# # Video metadata
# video_metadata = {
#     "title": "Tiger_cry_try",
#     "duration": 120,  # Duration in seconds
#     "user_id": 1,
#     "is_critical": False
# }

# upload_to_gcs(bucket_name, source_file_name, destination_blob_name, video_metadata)
