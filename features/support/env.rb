require 'simplecov'
SimpleCov.start

require 'cucumber/rails'
require 'rspec/rails'
require 'capybara/rails'
require 'factory_bot_rails'
require 'webdrivers'
require 'devise/test/integration_helpers'

ActionController::Base.allow_rescue = false

World(Rails.application.routes.url_helpers)
World(FactoryBot::Syntax::Methods)

# Include Devise test helpers
World(Devise::Test::IntegrationHelpers)

# Make sure the database is clean before running tests
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
