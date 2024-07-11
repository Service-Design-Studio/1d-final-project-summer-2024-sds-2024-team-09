module ControllerHelpers
  def log_in(user)
    session[:user_id] = user.id
  end
end

RSpec.configure do |config|
  config.include ControllerHelpers, type: :controller
end
