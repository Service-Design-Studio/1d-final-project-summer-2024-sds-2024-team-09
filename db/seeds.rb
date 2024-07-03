# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Clear existing videos
Video.destroy_all

# Create new videos
Video.create([
  { title: 'Sample Video 1', date: Date.parse('2024-07-01'), path: '/videos/sample1.mp4' },
  { title: 'Sample Video 2', date: Date.parse('2024-07-02'), path: '/videos/sample2.mp4' },
  { title: 'Sample Video 3', date: Date.parse('2024-07-03'), path: '/videos/sample3.mp4' }
])
