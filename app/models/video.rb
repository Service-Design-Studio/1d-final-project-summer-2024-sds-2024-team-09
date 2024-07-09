<<<<<<< HEAD
# class Video < ApplicationRecord
#     #has_one_attached :file
#     has_one_attached :my_file
#     mount_uploader :file_path, VideoUploader

#     def file_path_url
#         file_path.url
#     end
# end

class Video < ApplicationRecord
    mount_uploader :file_path, VideoUploader
  
    validates :title, presence: true
    validates :file_path, presence: true
  
    before_destroy :remove_file_path!
  
    def file_path_url
      "#{file_path}"
    end
  
    private

    def remove_file_path!
      file = Rails.root.join('public', 'uploads', 'video', read_attribute(:file_path))
      File.delete(file) if File.exist?(file)
    rescue => e
      Rails.logger.error "Failed to remove file: #{e.message}"
    end
  end
  
=======
class Video < ApplicationRecord
  # Add any necessary validations or associations here
end
>>>>>>> 38a4c1af772dc2f687f14c47bf0a491d38b15eef
