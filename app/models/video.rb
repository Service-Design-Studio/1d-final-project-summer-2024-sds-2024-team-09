class Video < ApplicationRecord
    belongs_to :user
    has_one_attached :file

    after_commit :set_duration, on: :create

    private

    def set_duration
        return unless file.attached?

        video_path = ActiveStorage::Blob.service.send(:path_for, file.key)
        movie = FFMPEG::Movie.new(video_path)
        update(duration: movie.duration)
    end
end
