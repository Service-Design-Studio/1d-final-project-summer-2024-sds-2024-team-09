class PagesController < ApplicationController
  before_action :require_login

  def camera
    @user_setting = current_user.user_setting || current_user.create_user_setting
  end

  def camera_broadcast
    @user_setting = current_user.user_setting

    unless @user_setting
      flash[:error] = "User settings not found"
      redirect_to some_path and return
    end
  end
end
  