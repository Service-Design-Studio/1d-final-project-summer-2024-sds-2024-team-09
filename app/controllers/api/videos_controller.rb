module Api
  class VideosController < ApplicationController
    def index
      videos = Video.all
      render json: videos.as_json(only: [:id, :title, :created_at], methods: [:file_path_url])
    end

    def update
      video = Video.find(params[:id])
      if video.update(video_params)
        render json: video
      else
        render json: video.errors, status: :unprocessable_entity
      end
    end

    private

    def video_params
      params.require(:video).permit(:title, :file_path)
    end
  end
end
