from google.cloud import storage

class UploadVideo:
    def __init__(self, bucket_name:str, source_file_path:str, destination_blob_name:str):
        self.bucket_name = bucket_name
        self.source_file_path = source_file_path
        self.destination_blob_name = destination_blob_name
        
        self.storage_client = storage.Client.from_service_account_json("/home/mike/cry-baby/jya-keyfile.json")
        self.bucket = self.storage_client.bucket(self.bucket_name)
        self.blob = self.bucket.blob(self.destination_blob_name)

    def upload_to_gcs(self):
        # Upload the file to the blob
        self.blob.upload_from_filename(self.source_file_path)

        print(
            f"File {self.source_file_path} uploaded to {self.destination_blob_name}."
        )
        

# Usage example:
# bucket_name = 'video-upload-jya'  # Replace with your bucket name
# source_file_name = 'videos/IMG_2735.mp4'  # Replace with the path to your video file
# destination_blob_name = 'AItest_upload/IMG_2735.mp4'  # Replace with the destination path in the bucket


