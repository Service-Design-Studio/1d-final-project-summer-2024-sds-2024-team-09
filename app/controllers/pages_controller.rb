class PagesController < ApplicationController
  before_action :require_login

  def camera
    @user_setting = current_user.user_setting || current_user.create_user_setting
  end
end
  