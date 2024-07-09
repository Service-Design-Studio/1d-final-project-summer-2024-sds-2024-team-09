<<<<<<< HEAD
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
=======
class VideosController < ApplicationController
  def index
    @videos = Video.all

    if params[:sort] == 'latest'
      @videos = @videos.order(upload_date: :desc)
    elsif params[:sort] == 'earliest'
      @videos = @videos.order(upload_date: :asc)
    end

    if params[:month].present? && params[:year].present?
      @videos = @videos.where('extract(month from upload_date) = ? AND extract(year from upload_date) = ?', params[:month], params[:year])
    end
  end

  def edit
    @video = Video.find(params[:id])
  end

  def update
    @video = Video.find(params[:id])
    if @video.update(video_params)
      redirect_to videos_path, notice: 'Video title was successfully updated.'
    else
      render :edit
>>>>>>> 38a4c1af772dc2f687f14c47bf0a491d38b15eef
    end
  end

  def destroy
<<<<<<< HEAD
    @video.destroy
    head :no_content
=======
    @video = Video.find(params[:id])
    @video.destroy
    redirect_to videos_path, notice: 'Video was successfully deleted.'
>>>>>>> 38a4c1af772dc2f687f14c47bf0a491d38b15eef
  end

  private

<<<<<<< HEAD
  def set_video
    @video = Video.find(params[:id])
  end

  def video_params
    params.require(:video).permit(:title, :file_path, :duration)
=======
  def video_params
    params.require(:video).permit(:title)
>>>>>>> 38a4c1af772dc2f687f14c47bf0a491d38b15eef
  end
end
