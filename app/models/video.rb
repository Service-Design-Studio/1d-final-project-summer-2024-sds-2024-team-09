class Video < ApplicationRecord
    belongs_to :user
    has_one_attached :file
end
