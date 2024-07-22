# app\controllers\application_controller.rb
class ApplicationController < ActionController::Base
    include SessionsHelper
    protect_from_forgery with: :exception
    before_action :require_login
    # skip_before_action :verify_authenticity_token
    
    private
  
    def require_login
      unless logged_in?
        redirect_to login_url
      end
    end
  end
  