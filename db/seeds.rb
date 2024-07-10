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

puts "Creating videos..."

# Clear existing videos
videos = [
  { title: 'Video 1', date: Date.parse('2024-07-01'), path: '../public/uploads/video/1/IMG_2735.mp4' },
  { title: 'Video 2', date: Date.parse('2024-07-02'), path: '../public/uploads/video/2/IMG_2739.mp4' },
  { title: 'Video 3', date: Date.parse('2024-07-03'), path: '../public/uploads/video/3/IMG_2769.mp4' }
]

videos.each do |video|
  created_video = Video.create!(video)
  puts "Created video: #{created_video.title}"
end

puts "Seeded #{Video.count} videos."

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
