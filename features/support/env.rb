require 'simplecov'
SimpleCov.start

# Previous content of test helper now starts here

require 'cucumber/rails'
require 'rspec/rails'
require 'capybara/rails'
require 'factory_bot_rails'

World(Rails.application.routes.url_helpers)
World(FactoryBot::Syntax::Methods)

# Make sure database is clean before running tests
DatabaseCleaner.strategy = :transaction
Cucumber::Rails::Database.javascript_strategy = :truncation

# Include RSpec matchers
World(RSpec::Matchers)

# Configure Capybara
Capybara.default_selector = :css
