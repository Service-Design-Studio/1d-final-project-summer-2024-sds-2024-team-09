# app/controllers/api/videos_controller.rb
module Api
  class VideosController < ApplicationController
    #protect_from_forgery with: :null_session
    skip_before_action :verify_authenticity_token


    def index
      videos = Video.all
      #render json: videos

      #Apply sorting
      case params[:sort_by]
      when 'title'
        videos = videos.order(title: params[:order] == 'desc' ? :desc : :asc)
      when 'duration'
        videos = videos.order(duration: params[:order] == 'desc' ? :desc : :asc)
      else
        videos = videos.order(created_at: params[:order] == 'desc' ? :desc : :asc)
      end

      render json: videos.map { |video| video.as_json(only: [:id, :title, :created_at], methods: [:file_path_url]) }
    end

    def update
      video = Video.find(params[:id])
      if video.update(video_params)
        render json: video
      else
        render json: video.errors, status: :unprocessable_entity
      end
    end

    def destroy
      video = Video.find(params[:id])
      video.destroy
      head :no_content
    end

    private

    def video_params
      params.require(:video).permit(:title, :file_path)
    end

  end
end
