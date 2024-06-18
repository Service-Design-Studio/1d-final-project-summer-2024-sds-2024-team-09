# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require 'rake'
require_relative 'config/application'

Rails.application.load_tasks

# Define a new task to run RSpec
task :run_rspec do
  sh "RAILS_ENV=test rspec"
end
