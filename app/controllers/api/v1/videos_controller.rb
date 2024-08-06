module Api
  module V1
    class VideosController < ApplicationController
      skip_before_action :verify_authenticity_token, only: [:index, :create, :update, :destroy]
      before_action :require_login, except: [:index, :show]
      before_action :set_video, only: [:show, :update, :destroy]

      def index
        user_id = params[:user_id] || current_user.id
        Rails.logger.debug "Fetching videos for user_id: #{user_id}"
        @videos = Video.where(user_id: user_id).order(created_at: :desc)
        Rails.logger.debug "Videos found: #{@videos.count}"

        videos_with_urls = @videos.map do |video|
          file_path_url = "https://storage.googleapis.com/video-upload-jya/#{video.title}.webm"

          {
            id: video.id,
            uuid: video.uuid,
            title: video.title,
            created_at: video.created_at,
            duration: video.duration,
            file_path_url: file_path_url,
            user_id: video.user_id # Ensure user_id is included here
          }
        end
        Rails.logger.debug "Videos with URLs: #{videos_with_urls}"
        render json: videos_with_urls
      end

      def show
        render json: @video
      end 

      def update
        old_title = @video.title
        new_title = video_params[:title]

        if @video.update(video_params.except(:file_path))
          rename_gcs_file(@video.file.key, old_title, new_title) if @video.file.attached?
          @video.update(file_path: "#{new_title}.webm")
          render json: @video, status: :ok
        else
          render json: @video.errors, status: :unprocessable_entity
        end
      end

      def create
        video = current_user.videos.new(video_params)

        if video.save
          render json: video, status: :created
        else
          render json: video.errors, status: :unprocessable_entity
        end
      end

      def destroy
        if @video.file.attached?
          delete_gcs_file(@video.file.key)
        end

        if @video.destroy
          head :no_content
        else
          render json: { error: 'Failed to destroy the video.' }, status: :unprocessable_entity
        end
      end

      private

      def set_video
        @video = current_user.videos.find_by(uuid: params[:uuid]) || current_user.videos.find_by(id: params[:id])
        if @video.nil?
          render json: { error: 'Video not found' }, status: :not_found
        end
      end

      def video_params
        params.require(:video).permit(:title, :file_path, :duration, :recorded_at, :file)
      end

      def generate_signed_url_for(file_path)
        storage = Google::Cloud::Storage.new
        bucket = storage.bucket("video-upload-jya")
        file = bucket.file(file_path)

        if file
          signed_url = file.signed_url(
            method: "GET",
            expires: 600, # URL expires in 10 minutes
            headers: { "Access-Control-Allow-Origin" => "*" } # Allow CORS
          )
          signed_url
        else
          nil
        end
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
        end
      end

      def delete_gcs_file(file_key)
        storage = Google::Cloud::Storage.new
        bucket = storage.bucket("video-upload-jya")
        file = bucket.file(file_key)

        if file
          file.delete
        end
      end
    end
  end
end
