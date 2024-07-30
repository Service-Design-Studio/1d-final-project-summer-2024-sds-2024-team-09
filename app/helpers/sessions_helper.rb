module SessionsHelper
    def log_in(user)
      session[:user_id] = user.id
      Rails.logger.debug "User logged in with ID: #{session[:user_id]}"
    end
  
    def current_user
      Rails.logger.debug "Session user_id: #{session[:user_id]}"
      @current_user ||= User.find_by(id: session[:user_id])
      Rails.logger.debug "Current user: #{@current_user.inspect}"
      @current_user
    end
  
    def logged_in?
      !current_user.nil?
    end
  
    def log_out
      session.delete(:user_id)
      @current_user = nil
    end

    def set_message(type, message)
      @message = { type: type, text: message }
    end
  
    def get_message
      @message
    end
  end
  