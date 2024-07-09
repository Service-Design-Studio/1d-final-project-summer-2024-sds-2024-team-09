# namespace :videos do
#     desc "Import videos from a directory"
#     task import: :environment do
#       directory = File.join(Dir.home, 'Desktop', 'Sprint 2 Test Vids') # This code assumes that the videos to be displayed are stored in a directory named Sprint 2 Test Vids in Desktop
#       Dir.glob("#{directory}/*").each do |file_path|
#         next unless File.file?(file_path) # Skip if it's not a file
  
#         file_name = File.basename(file_path)
#         title = file_name
  
#         video = Video.new(title: title)
#         video.file_path = File.open(file_path) # Assign the file
#         if video.save
#           puts "Imported: #{file_name}"
#         else
#           puts "Failed to import: #{file_name}"
#         end
#       end
#     end
#   end  

# namespace :videos do
#   desc "Import videos from a directory"
#   task import: :environment do
#     require 'fileutils'

#     video_dir = 'C:/Users/Lee Jya Yin/Desktop/Sprint 2 Test Vids' # Change to your directory
#     Dir.foreach(video_dir) do |filename|
#       next if filename == '.' || filename == '..'

#       video_path = File.join(video_dir, filename)

#       video = Video.new(title: filename)
#       video.file_path = File.open(video_path)

#       if video.save
#         puts "Imported: #{filename}"
#       else
#         puts "Failed to import: #{filename}"
#       end
#     end
#   end
# end

# lib/tasks/import_vids.rake
namespace :videos do
  desc 'Import videos'
  task import: :environment do
    source_video_dir = 'C:/Users/Lee Jya Yin/Desktop/Sprint 2 Test Vids'
    dest_video_dir = Rails.root.join('public', 'uploads', 'video')
    assets_video_dir = Rails.root.join('app', 'assets', 'videos')

    Dir.glob("#{source_video_dir}/**/*").each_with_index do |file, index|
      next if File.directory?(file) # Skip directories

      filename = File.basename(file)
      video_id = index + 1

      # Copy to public/uploads/video
      dest_path = File.join(dest_video_dir, video_id.to_s, filename)
      FileUtils.mkdir_p(File.dirname(dest_path))
      FileUtils.cp(file, dest_path)

      # Copy to app/assets/videos
      assets_path = File.join(assets_video_dir, video_id.to_s, filename)
      FileUtils.mkdir_p(File.dirname(assets_path))
      FileUtils.cp(file, assets_path)

      # Find or initialize video and set attributes
      video = Video.find_or_initialize_by(id: video_id)
      video.title = filename

      # Use the uploader to assign the file_path
      video.file_path = File.open(file)
      
      if video.save
        puts "Imported: #{filename}"
      else
        puts "Failed to import: #{filename} - #{video.errors.full_messages.join(', ')}"
      end
    end
  end
end



