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
    end
  end

  def destroy
    @video = Video.find(params[:id])
    @video.destroy
    redirect_to videos_path, notice: 'Video was successfully deleted.'
  end

  private

  def video_params
    params.require(:video).permit(:title)
  end
end
