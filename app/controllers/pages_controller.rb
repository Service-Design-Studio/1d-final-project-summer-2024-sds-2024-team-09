class PagesController < ApplicationController
  before_action :require_login

  # def camera
  #   @user_setting = current_user.user_setting || current_user.create_user_setting
  # end

  def camera
    # Find user setting either by current user's setting or by email associated with any user's setting
    @user_setting = current_user.user_setting || UserSetting.where("emails @> ?", "{#{current_user.email}}").first
  end
end
  