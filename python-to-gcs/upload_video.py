from google.cloud import storage
from datetime import datetime

def upload_to_gcs(bucket_name, source_file_name, destination_blob_name):
    """Uploads a file to the bucket."""
    # Initialize a storage client
    storage_client = storage.Client()

    # Get the bucket that the file will be uploaded to
    bucket = storage_client.bucket(bucket_name)

    # Create a blob object from the bucket
    blob = bucket.blob(destination_blob_name)

    # Upload the file to the blob
    blob.upload_from_filename(source_file_name)

    print(
        f"File {source_file_name} uploaded to {destination_blob_name}."
    )

    # send to sql if true

# Usage example:
bucket_name = 'video-upload-jya'  # Replace with your bucket name
source_file_name = 'videos/IMG_2735.mp4'  # Replace with the path to your video file
destination_blob_name = 'AItest_upload/IMG_2735.mp4'  # Replace with the destination path in the bucket


upload_to_gcs(bucket_name, source_file_name, destination_blob_name)
