class VideosController < ApplicationController
  def index
    @videos = Video.all.order(upload_date: :desc)
  end

  def update
    @video = Video.find(params[:id])
    if @video.update(video_params)
      redirect_to history_path, notice: 'Video title was successfully updated.'
    else
      render :index
    end
  end

  private

  def video_params
    params.require(:video).permit(:title)
  end
end
