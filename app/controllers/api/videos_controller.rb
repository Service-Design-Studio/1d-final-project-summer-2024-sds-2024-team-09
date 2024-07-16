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
      if @video.update(video_params)
        render json: @video, status: :ok
      else
        render json: @video.errors, status: :unprocessable_entity
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
  end
end
