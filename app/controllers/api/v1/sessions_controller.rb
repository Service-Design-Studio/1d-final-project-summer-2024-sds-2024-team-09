# app/controllers/api/v1/sessions_controller.rb
module Api
    module V1
      class SessionsController < ApplicationController
        skip_before_action :require_login, only: [:create]
        skip_before_action :verify_authenticity_token, only: [:create]
  
        def create
          Rails.logger.debug "Params: #{params[:session]}"
          user = User.find_by(email: params[:session][:email].downcase) || User.find_by(username: params[:session][:username])
          if user && user.authenticate(params[:session][:password])
            log_in(user)
            Rails.logger.debug "User logged in successfully: #{user.email}"
            render json: { message: 'Login successful', user: UserSerializer.new(user) }, status: :ok
          else
            Rails.logger.debug "Invalid email/password combination or user not found"
            render json: { error: 'Invalid email/password combination' }, status: :unauthorized
          end
        end
  
        def destroy
          log_out
          render json: { message: 'Logout successful' }, status: :ok
        end
  
        private
  
        def session_params
          params.require(:session).permit(:email, :username, :password)
        end
      end
    end
  end
  