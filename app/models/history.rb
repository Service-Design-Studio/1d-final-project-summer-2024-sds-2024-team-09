class History < ApplicationRecord
    validates :start_time, presence: true
    validates :end_time, presence: true
    validates :video_path, presence: true
end
