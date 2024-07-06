class Video < ApplicationRecord
    #has_one_attached :file
    mount_uploader :file_path, VideoUploader

    def file_path_url
        file_path.url
    end
end

# app/models/video.rb
# class Video < ApplicationRecord
#     mount_uploader :file_path, VideoUploader
#   end
  