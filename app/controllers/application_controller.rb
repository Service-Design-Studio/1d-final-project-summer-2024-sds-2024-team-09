class ApplicationController < ActionController::Base
    include SessionsHelper
    
    private
  
    def require_login
      unless logged_in?
        render json: { error: 'Unauthorized access' }, status: :unauthorized
      end
    end
  end
  