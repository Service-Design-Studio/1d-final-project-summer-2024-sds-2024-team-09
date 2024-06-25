class VideosController < ApplicationController
    def new
      @video = Video.new
    end
  
    def create
      @video = Video.new(video_params)
      if @video.save
        redirect_to @video
      else
        render :new
      end
    end
  
    def show
      @video = Video.find(params[:id])
    end
  
    def index
      @videos = Video.all
    end
  
    private
  
    def video_params
      params.require(:video).permit(:title, :file)
    end
  end
  