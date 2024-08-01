require 'simplecov'
SimpleCov.start

require 'cucumber/rails'
require 'rspec/rails'
require 'capybara/rails'
require 'factory_bot_rails'
require 'webdrivers'

ActionController::Base.allow_rescue = false

World(Rails.application.routes.url_helpers)
World(FactoryBot::Syntax::Methods)

# Create a helper method to log in a user
module LoginHelper
  def log_in(user)
    visit login_path
    fill_in 'session[email]', with: user.email
    fill_in 'session[password]', with: user.password
    click_button 'Log In'
  end
end

World(LoginHelper)

# Create a helper method to mock user login
module ControllerHelpers
  def login_as(user)
    # This will use Capybara to perform a login
    visit login_path
    fill_in 'session[email]', with: user.email
    fill_in 'session[password]', with: user.password
    click_button 'Log In'
  end
end

World(ControllerHelpers)




# Make sure database is clean before running tests
DatabaseCleaner.strategy = :transaction
Cucumber::Rails::Database.javascript_strategy = :truncation

Capybara.register_driver :selenium do |app|
  Capybara::Selenium::Driver.new(app, browser: :chrome)
end

Capybara.javascript_driver = :selenium_chrome

# Include RSpec matchers
World(RSpec::Matchers)

# Configure Capybara
Capybara.default_selector = :css
