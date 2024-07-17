require "google/cloud/storage"
module Api
  class VideosController < ApplicationController
    before_action :require_login
    before_action :set_video, only: [:update, :destroy]

    def index
      sort_by = params[:sort_by] || 'created_at'
      order = params[:order] || 'asc'

      @videos = current_user.videos.order("#{sort_by} #{order}")

      videos_with_urls = @videos.map do |video|
        attachment = video.file_attachment

        file_path_url = attachment&.persisted? ? url_for(attachment) : nil

        {
          id: video.id,
          title: video.title,
          created_at: video.created_at,
          duration: video.duration,
          file_path_url: file_path_url
        }
      end
      render json: videos_with_urls
    end

    def update
      old_title = @video.title
      new_title = video_params[:title]

      if @video.update(video_params)
        rename_gcs_file(@video.file.key, old_title, new_title) if @video.file.attached?
        render json: @video, status: :ok
      else
        render json: @video.errors, status: :unprocessable_entity
      end
    end  

    def update_gcs_metadata(video)
      # Assuming you have the Google Cloud Storage gem installed and configured
      require "google/cloud/storage"
    
      storage = Google::Cloud::Storage.new
      bucket = storage.bucket("video-upload-jya")
      file = bucket.file(video.file_path) # Assuming file_path stores the GCS object name
    
      if file
        file.update_metadata({ "title" => video.title }) # Update metadata with new title
      else
        Rails.logger.error("File not found in GCS for video ID #{video.id}")
      end
    end

    def destroy
      if @video.destroy
        head :no_content
      else
        render json: { error: 'Failed to destroy the video.' }, status: :unprocessable_entity
      end
    end

    private

    def set_video
      @video = current_user.videos.find_by(id: params[:id])
      if @video.nil?
        render json: { error: 'Video not found' }, status: :not_found
      end
    end

    def video_params
      params.require(:video).permit(:title, :file_path, :duration, :recorded_at, :file)
    end

    def rename_gcs_file(file_key, old_title, new_title)
      bucket_name = 'video-upload-jya'
      old_file_path = "#{old_title}.webm"
      new_file_path = "#{new_title}.webm"
    
      storage = Google::Cloud::Storage.new
      bucket = storage.bucket(bucket_name)
      file = bucket.file(file_key)
    
      if file
        file.copy(new_file_path)
        file.delete
        @video.update(file_path: new_file_path)
        Rails.logger.info "File renamed from #{old_file_path} to #{new_file_path} in GCS bucket #{bucket_name}"
      else
        Rails.logger.error "File with key #{file_key} not found in GCS bucket #{bucket_name}"
        false
      end
    end
  end
end
