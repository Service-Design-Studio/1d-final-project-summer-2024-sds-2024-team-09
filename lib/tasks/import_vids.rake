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

namespace :videos do
  desc "Import videos from a directory"
  task import: :environment do
    require 'fileutils'

    source_dir = 'C:/Users/Lee Jya Yin/Desktop/Sprint 2 Test Vids' # Change to your directory
    Dir.glob("#{source_dir}/*").each do |file|
      filename = File.basename(file)
      video = Video.new(title: filename)
      video.file_path = File.open(file)
      
      if video.save
        puts "Imported: #{filename}"
      else
        puts "Failed to import: #{filename}"
        puts video.errors.full_messages
      end
    end
  end
end

