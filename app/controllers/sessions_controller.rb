class SessionsController < ApplicationController
  skip_before_action :require_login, only: [:new, :create]

  def new
    if logged_in?
      redirect_to root_path
    end
  end

  def create
    Rails.logger.debug "Params: #{params[:session]}"
    user = User.find_by(email: params[:session][:email].downcase) || User.find_by(username:params[:session][:username])
    if user && user.authenticate(params[:session][:password])
      log_in user
      Rails.logger.debug "User logged in successfully: #{user.email}"
      redirect_to root_path
    else
      Rails.logger.debug "Invalid email/password combination or user not found"
      # flash.now[:danger] = 'Invalid email/password combination'
      render 'new'
    end
  end

  def destroy
    log_out
    redirect_to root_url
  end

  private

  def session_params
    params.require(:session).permit(:email, :password)
  end
end
