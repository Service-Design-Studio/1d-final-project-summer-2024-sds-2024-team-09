class Video < ApplicationRecord
    #has_one_attached :file
    has_one_attached :my_file
    mount_uploader :file_path, VideoUploader

    def file_path_url
        file_path.url
    end
end