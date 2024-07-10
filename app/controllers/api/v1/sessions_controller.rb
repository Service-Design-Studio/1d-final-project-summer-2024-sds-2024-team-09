module Api
    module V1
      class SessionsController < ApplicationController
        def create
          user = User.find_by(username: params[:username]) || User.find_by(email: params[:email])
          if user&.authenticate(params[:password])
            render json: { status: 'success', user_id: user.id }
          else
            render json: { status: 'error', message: 'Invalid username/email or password' }, status: :unauthorized
          end
        end
      end
    end
  end
  