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
      head :no_content
    end

    private

    def set_video
      @video = Video.find(params[:id])
    end

    def video_params
      params.require(:video).permit(:title, :url, :description, :upload_date)
    end
  end
end
