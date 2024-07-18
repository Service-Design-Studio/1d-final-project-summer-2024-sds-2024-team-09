class Api::V1::VideosController < ApplicationController
  skip_before_action :require_login
  def index
    @videos = Video.all
    render json: @videos
  end
end
