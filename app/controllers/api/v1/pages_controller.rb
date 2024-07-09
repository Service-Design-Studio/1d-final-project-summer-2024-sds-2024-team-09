# app/controllers/api/v1/pages_controller.rb

module Api
    module V1
      class PagesController < ApplicationController
        before_action :require_login
  
        def index
          # Your code for index action
        end
  
        def camera
          @user_setting = current_user.user_setting || current_user.create_user_setting
          render json: { user_setting: @user_setting }
        end
  
        def video_history
          @videos = Video.all
          render json: { videos: @videos }
        end
  
        private
  
        def require_login
          unless logged_in?
            Rails.logger.debug "User not logged in"
            render json: { error: 'You must be logged in to access this section' }, status: :unauthorized
          else
            Rails.logger.debug "User is logged in"
          end
        end
      end
    end
  end
  