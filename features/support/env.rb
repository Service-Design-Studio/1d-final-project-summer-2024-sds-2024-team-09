# features/support/env.rb
require 'factory_bot'

FactoryBot.definition_file_paths = [File.expand_path('spec/factories', __dir__)]
FactoryBot.find_definitions

World(FactoryBot::Syntax::Methods)
