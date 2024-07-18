class ApplicationController < ActionController::Base
    include SessionsHelper
    before_action :require_login
    skip_before_action :verify_authenticity_token
    
    private
  
    def require_login
      unless logged_in?
        redirect_to login_url
      end
    end
  end
  