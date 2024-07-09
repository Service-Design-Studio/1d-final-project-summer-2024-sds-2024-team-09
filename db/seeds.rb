# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
Video.create([
  { title: 'Local Video 1', url: '/videos/Local Video 1.mp4', upload_date: DateTime.now },
  { title: 'Local Video 2', url: '/videos/Local Video 2.mp4', upload_date: DateTime.now },
  { title: 'Local Video 3', url: '/videos/Local Video 3.mp4', upload_date: DateTime.now }
])
