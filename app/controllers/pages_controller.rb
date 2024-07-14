class PagesController < ApplicationController
  before_action :require_login

  def camera
    @user_setting = current_user.user_setting || current_user.create_user_setting
  end
  def video_history
    # This action will render the app/views/pages/video_history.html.erb template
    @videos = Video.all
  end

  private

  def require_login
    unless logged_in?
      Rails.logger.debug "User not logged in"
      redirect_to login_path
    else
      Rails.logger.debug "User logged in"
    end
  end
end
