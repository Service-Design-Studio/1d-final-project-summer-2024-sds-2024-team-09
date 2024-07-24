#app\controllers\user_settings_controller.rb
class UserSettingsController < ApplicationController
  before_action :require_login
  skip_before_action :verify_authenticity_token, only: [:create]


  def new
    @user_setting = current_user.build_user_setting
  end

  def create
    @user_setting = current_user.build_user_setting(user_setting_params)
    if @user_setting.save
      redirect_to root_path, notice: 'Settings saved successfully'
    else
      render :new
    end
  end

  def edit
    @user_setting = current_user.user_setting || current_user.build_user_setting
  end

  def update
    @user_setting = current_user.user_setting
    if @user_setting.update(user_setting_params)
      redirect_to root_path, notice: 'Settings updated successfully'
    else
      render :edit
    end
  end

  private

  def user_setting_params
    params.require(:user_setting).permit(:app_id, :token, :channel)
  end
end
