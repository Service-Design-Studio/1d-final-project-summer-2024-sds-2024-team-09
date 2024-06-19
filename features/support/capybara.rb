require 'cucumber/rails'
require 'capybara/cucumber'
require 'selenium-webdriver'

Capybara.register_driver :selenium do |app|
  Capybara::Selenium::Driver.new(app, browser: :chrome)
end

Capybara.javascript_driver = :selenium

# Ensuring database is cleaned after each scenario
DatabaseCleaner.strategy = :truncation
Cucumber::Rails::Database.javascript_strategy = :truncation
