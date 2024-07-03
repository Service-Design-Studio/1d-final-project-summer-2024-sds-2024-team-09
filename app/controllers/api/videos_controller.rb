# app/controllers/api/videos_controller.rb
module Api
  class VideosController < ApplicationController
    protect_from_forgery with: :null_session

    def index
      videos = Video.all
      render json: videos
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
      params.require(:video).permit(:title)
    end
  end
end
