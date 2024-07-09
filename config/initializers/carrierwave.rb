# config/initializers/carrierwave.rb

CarrierWave.configure do |config|
    config.root = Rails.root
    config.cache_dir = "#{Rails.root}/tmp/uploads"
  end
  