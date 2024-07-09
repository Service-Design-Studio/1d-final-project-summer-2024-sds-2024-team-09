module Api
    module V1
      class SessionsController < ApplicationController
        include SessionsHelper
        skip_before_action :verify_authenticity_token

        def create
          user = User.find_by(username: params[:username]) || User.find_by(email: params[:email])
          if user&.authenticate(params[:password])
            log_in(user)
            render json: { status: 'success', user_id: user.id }
          else
            render json: { status: 'error', message: 'Invalid username/email or password' }, status: :unauthorized
          end
        end
      end
    end
  end
  