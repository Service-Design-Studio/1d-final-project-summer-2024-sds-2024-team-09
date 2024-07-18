class Api::V1::VideosController < ApplicationController
  skip_before_action :require_login
  def index
    @videos = Video.all
    render json: @videos
  end

  def show
    @video = Video.find(params[:id])
    render json: @video
  end 

  def update
    @video = Video.find(params[:id])
    if @video.update(video_params)
      render json: @video
    else
      render json: @video.errors
    end
  end

  def create
    @video = Video.new(video_params)
    if @video.save
      render json: @video
    else
      render json: @video.errors
    end
  end

  def destroy
    @video = Video.find(params[:id])
    if @video.destroy
      head :no_content, status: :ok
    else
      render json: @video.errors, status: :unprocessable_entity
    end
  end

  # Strong parameters to permit only allowed attributes
  def video_params
    params.require(:video).permit(:title, :file_path, :duration, :is_critical, :user_id)
  end
end
