class VideosController < ApplicationController
  def index
    @videos = Video.all.order(upload_date: :desc)
  end
end
