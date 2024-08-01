require "google/cloud/storage"

module Api
  class VideosController < ApplicationController
    skip_before_action :verify_authenticity_token, only: [:index, :create, :update, :destroy]
    before_action :require_login
    before_action :set_video_by_uuid, only: [:update, :destroy]

    def index
      sort_by = params[:sort_by] || 'created_at'
      order = params[:order] || 'asc'

      @videos = current_user.videos.order("#{sort_by} #{order}")

      videos_with_urls = @videos.map do |video|
        file_path_url = "https://storage.googleapis.com/video-upload-jya/#{video.file_path}"
        thumbnail_url = video.thumbnail_url.present? ? video.thumbnail_url : "https://storage.googleapis.com/video-upload-jya/default_thumbnail.jpg"

        {
          id: video.id,
          uuid: video.uuid,
          title: video.title,
          created_at: video.created_at,
          duration: video.duration,
          file_path_url: file_path_url,
          thumbnail_url: thumbnail_url
        }
      end
      render json: videos_with_urls
    end

    def create
      video = current_user.videos.new(video_params)

      if video.save
        upload_to_gcs(video)
        render json: video, status: :created
      else
        render json: video.errors, status: :unprocessable_entity
      end
    end

    def update
      if @video.update(video_params.except(:file_path))
        render json: @video, status: :ok
      else
        render json: @video.errors, status: :unprocessable_entity
      end
    end

    def destroy
      if @video.file_path.present?
        delete_from_gcs(@video.file_path)
      end

      if @video.destroy
        head :no_content
      else
        render json: { error: 'Failed to destroy the video.' }, status: :unprocessable_entity
      end
    end

    private

    def set_video_by_uuid
      Rails.logger.debug "Looking for video with UUID: #{params[:id]}"
      @video = current_user.videos.find_by!(uuid: params[:id])
    rescue ActiveRecord::RecordNotFound
      Rails.logger.error "Video not found with UUID: #{params[:id]}"
      render json: { error: 'Video not found' }, status: :not_found
    end

    def video_params
      params.require(:video).permit(:title, :file_path, :duration, :recorded_at, :file)
    end

    def upload_to_gcs(video)
      temp_file_path = save_temp_video_file(video)

      storage = Google::Cloud::Storage.new
      bucket = storage.bucket("video-upload-jya")
      user_id_directory = "videos/#{current_user.id}"

      object_name = "#{user_id_directory}/#{video.uuid}/#{video.title}.webm"
      file = bucket.create_file(temp_file_path, object_name)
      video.update_columns(file_path: object_name)

      generate_and_upload_thumbnail(video, temp_file_path)

      # Clean up the temporary file
      File.delete(temp_file_path) if File.exist?(temp_file_path)
    end

    def save_temp_video_file(video)
      temp_file_path = "#{Rails.root}/tmp/#{video.uuid}.webm"
      File.open(temp_file_path, 'wb') do |file|
        file.write(video.file.download)
      end
      temp_file_path
    end

    def generate_and_upload_thumbnail(video, temp_file_path)
      output_file_path = "#{Rails.root}/tmp/#{video.uuid}_thumbnail.jpg"

      begin
        movie = FFMPEG::Movie.new(temp_file_path)
        movie.screenshot(output_file_path, seek_time: 0)

        storage = Google::Cloud::Storage.new
        bucket = storage.bucket("video-upload-jya")
        thumbnail_name = "videos/#{current_user.id}/#{video.uuid}/thumbnail.jpg"
        file = bucket.create_file(output_file_path, thumbnail_name)

        video.update_columns(thumbnail_url: file.public_url)
        Rails.logger.info "Thumbnail generated and uploaded: #{file.public_url}"
      rescue => e
        Rails.logger.error "Error generating thumbnail: #{e.message}"
      ensure
        File.delete(output_file_path) if File.exist?(output_file_path)
      end
    end

    def delete_from_gcs(file_path)
      storage = Google::Cloud::Storage.new
      bucket = storage.bucket("video-upload-jya")
      file = bucket.file(file_path)

      if file
        file.delete
      else
        Rails.logger.error "File not found in GCS: #{file_path}"
      end
    end
  end
end
