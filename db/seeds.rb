# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
<<<<<<< HEAD

# Clear existing videos
#Video.destroy_all

# Create new videos
# Video.create([
#   { title: 'Sample Video 1', date: Date.parse('2024-07-01'), path: '/videos/sample1.mp4' },
#   { title: 'Sample Video 2', date: Date.parse('2024-07-02'), path: '/videos/sample2.mp4' },
#   { title: 'Sample Video 3', date: Date.parse('2024-07-03'), path: '/videos/sample3.mp4' }
# ])

video_dir = 'C:/Users/Lee Jya Yin/Desktop/Sprint 2 Test Vids' # Change to your directory
Dir.foreach(video_dir) do |filename|
  next if filename == '.' || filename == '..'

  video_path = File.join(video_dir, filename)

  video = Video.new(title: filename)
  video.file_path = File.open(video_path)

  if video.save
    puts "Imported: #{filename}"
  else
    puts "Failed to import: #{filename}"
  end
end
=======
Video.create([
  { title: 'Local Video 1', url: '/videos/Local Video 1.mp4', upload_date: DateTime.now },
  { title: 'Local Video 2', url: '/videos/Local Video 2.mp4', upload_date: DateTime.now },
  { title: 'Local Video 3', url: '/videos/Local Video 3.mp4', upload_date: DateTime.now }
])
>>>>>>> 38a4c1af772dc2f687f14c47bf0a491d38b15eef
