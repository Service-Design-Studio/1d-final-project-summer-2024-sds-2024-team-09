# class UserSettingsController < ApplicationController
#   before_action :require_login

#   def new
#     @user_setting = current_user.build_user_setting
#   end

#   def create
#     @user_setting = current_user.build_user_setting(user_setting_params)
#     if @user_setting.save
#       redirect_to root_path, notice: 'Settings saved successfully'
#     else
#       render :new
#     end
#   end

#   def edit
#     @user_setting = current_user.user_setting || current_user.build_user_setting
#   end

#   def update
#     @user_setting = current_user.user_setting
#     if @user_setting.update(user_setting_params)
#       redirect_to root_path, notice: 'Settings updated successfully'
#     else
#       render :edit
#     end
#   end

#   private

#   def user_setting_params
#     params.require(:user_setting).permit(:app_id, :token, :channel)
#   end
# end



# class UserSettingsController < ApplicationController
#   before_action :require_login
#   before_action :set_user_setting, only: [:edit, :update, :add_email, :remove_email]

#   def new
#     @user_setting = current_user.build_user_setting
#   end

#   def create
#     @user_setting = current_user.build_user_setting(user_setting_params)
#     if @user_setting.save
#       redirect_to root_path, notice: 'Settings saved successfully'
#     else
#       render :new, status: :unprocessable_entity
#     end
#   end

#   def edit
#   end

#   def update
#     if @user_setting.update(user_setting_params)
#       redirect_to root_path, notice: 'Settings updated successfully'
#     else
#       render :edit, status: :unprocessable_entity
#     end
#   end

#   def add_email
#     email = params[:email]
#     if email.present? && !@user_setting.emails.include?(email)
#       @user_setting.emails << email
#       @user_setting.save
#     end
#     redirect_to edit_user_setting_path(@user_setting)
#   end

#   def remove_email
#     email = params[:email]
#     if email.present? && @user_setting.emails.include?(email)
#       @user_setting.emails.delete(email)
#       @user_setting.save
#     end
#     redirect_to edit_user_setting_path(@user_setting)
#   end

#   private

#   def set_user_setting
#     @user_setting = current_user.user_setting || current_user.build_user_setting
#   end

#   def user_setting_params
#     params.require(:user_setting).permit(:app_id, :token, :channel, emails: [])
#   end
# end


class UserSettingsController < ApplicationController
  before_action :require_login

  def new
    @user_setting = current_user.build_user_setting
  end

  def edit
    @user_setting = current_user.user_setting || current_user.build_user_setting
  end

  def create
    @user_setting = current_user.build_user_setting(user_setting_params)
    if @user_setting.save
      redirect_to root_path, notice: 'Settings saved successfully'
    else
      render :new
    end
  end

  def update
    @user_setting = current_user.user_setting
    if @user_setting.update(user_setting_params)
      redirect_to settings_path, notice: 'Settings updated successfully'
    else
      render :edit
    end
  end

  def remove_email
    @user_setting.emails.delete(params[:email])
    @user_setting.save
    redirect_to settings_path, notice: 'Email removed successfully'
  end

  private

  def user_setting_params
    params.require(:user_setting).permit(:app_id, :token, :channel, emails: [])
  end
end
