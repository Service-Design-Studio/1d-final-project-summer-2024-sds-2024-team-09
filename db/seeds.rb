# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end


# db/seeds.rb

# # Clear existing videos
# Video.destroy_all

# puts "Creating videos..."

# Define the videos with their attributes
# videos = [
#   { title: 'Video 1', date: Date.parse('2024-07-01'), path: Rails.root.join('public', 'uploads', 'video', '1', 'IMG_2735.mp4') },
#   { title: 'Video 2', date: Date.parse('2024-07-02'), path: Rails.root.join('public', 'uploads', 'video', '2', 'IMG_2739.mp4') },
#   { title: 'Video 3', date: Date.parse('2024-07-03'), path: Rails.root.join('public', 'uploads', 'video', '3', 'IMG_2769.mp4') }
# ]

# videos.each do |video_attrs|
#   # Open the file and assign it to the path attribute
#   File.open(video_attrs[:path]) do |file|
#     video = Video.new(title: video_attrs[:title], date: video_attrs[:date])
#     video.path = file
#     if video.save
#       puts "Created video: #{video.title}"
#     else
#       puts "Failed to create video: #{video.title} - #{video.errors.full_messages.join(', ')}"
#     end
#   end
# end

# puts "Seeded #{Video.count} videos."


# video_dir = 'C:/Users/Lee Jya Yin/Desktop/Sprint 2 Test Vids' # Change to your directory
# Dir.foreach(video_dir) do |filename|
#   next if filename == '.' || filename == '..'

#   video_path = File.join(video_dir, filename)

#   video = Video.new(title: filename)
#   video.file_path = File.open(video_path)

#   if video.save
#     puts "Imported: #{filename}"
#   else
#     puts "Failed to import: #{filename}"
#   end
# end
