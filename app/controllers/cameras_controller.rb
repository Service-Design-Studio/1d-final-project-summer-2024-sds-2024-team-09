# app\controllers\cameras_controller.rb
class CamerasController < ApplicationController
  before_action :set_user

  def new 
    @camera = @user.cameras.build
  end

  def create 
    @camera = @user.cameras.build(camera_params)
    if @camera.save
      redirect_to user_path, notice: 'Camera was successfully created.'
    else
      render :new
    end
  end

  private
  def set_user 
    @user = User.find(params[:user_id])
  end

  def camera_params
    params.require(:camera).permit(:camera_name, :app_id, :token, :channel, :image_url)
  end
end
