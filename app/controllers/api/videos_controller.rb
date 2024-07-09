<<<<<<< HEAD
# app/controllers/api/videos_controller.rb
module Api
  class VideosController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index
      videos = Video.all

      case params[:sort_by]
      when 'title'
        videos = videos.order(title: params[:order] == 'desc' ? :desc : :asc)
      when 'duration'
        videos = videos.order(duration: params[:order] == 'desc' ? :desc : :asc)
      else
        videos = videos.order(created_at: params[:order] == 'desc' ? :desc : :asc)
      end

      render json: videos.map { |video| video.as_json(only: [:id, :title, :created_at, :duration], methods: [:file_path_url]) }
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
=======
module Api
  class VideosController < ApplicationController
    # Ensure the controller responds with JSON by default
    before_action :set_video, only: [:show, :update, :destroy]

    # GET /api/videos
    def index
      @videos = Video.all.order(upload_date: :desc)
      render json: @videos
    end

    # GET /api/videos/:id
    def show
      render json: @video
    end

    # POST /api/videos
    def create
      @video = Video.new(video_params)
      if @video.save
        render json: @video, status: :created
      else
        render json: @video.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /api/videos/:id
    def update
      if @video.update(video_params)
        render json: @video
      else
        render json: @video.errors, status: :unprocessable_entity
      end
    end

    # DELETE /api/videos/:id
    def destroy
      @video.destroy
>>>>>>> 38a4c1af772dc2f687f14c47bf0a491d38b15eef
      head :no_content
    end

    private

<<<<<<< HEAD
    def video_params
      params.require(:video).permit(:title, :file_path, :duration)
=======
    def set_video
      @video = Video.find(params[:id])
    end

    def video_params
      params.require(:video).permit(:title, :url, :description, :upload_date)
>>>>>>> 38a4c1af772dc2f687f14c47bf0a491d38b15eef
    end
  end
end
