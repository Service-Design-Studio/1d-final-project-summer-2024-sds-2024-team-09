# app/controllers/videos_controller.rb
class VideosController < ApplicationController
  before_action :set_video, only: [:show, :edit, :update, :destroy]

  def index
    @videos = Video.all
  end

  def show
  end

  def edit
  end

  def create
    @video = Video.new(video_params)
    if @video.save
      redirect_to @video, notice: 'Video was successfully created.'
    else
      render :new
    end
  end

  def update
    if @video.update(video_params)
      render json: @video
    else
      render json: { errors: @video.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @video.destroy
    head :no_content
  end

  private

  def set_video
    @video = Video.find(params[:id])
  end

  def video_params
    params.require(:video).permit(:title, :file_path, :duration)
  end
end
