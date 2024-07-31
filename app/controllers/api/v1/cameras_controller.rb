class Api::V1::CamerasController < ApplicationController
  
  skip_before_action :require_login
  skip_before_action :verify_authenticity_token

  # GET /cameras
  def index
    @cameras = Camera.all
    render json: @cameras
  end

  # GET /cameras/1
  def show
    @camera = Camera.find(params[:id])
    render json: @camera
  end

  # POST /cameras
  def create
    @camera = Camera.new(camera_params)
    if @camera.save
      render json: @camera, status: :created
    else
      render json: @camera.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /cameras/1
  def update
    @camera = Camera.find(params[:id])
    if @camera.update(camera_params)
      render json: @camera
    else
      render json: @camera.errors, status: :unprocessable_entity
    end
  end

  # DELETE /cameras/1
  def destroy
    @camera = Camera.find(params[:id])
    @camera.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_camera
    @camera = Camera.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def camera_params
    params.require(:camera).permit(:app_id, :channel, :token, :user_id, :camera_name, :status, :image_url)
  end
end
