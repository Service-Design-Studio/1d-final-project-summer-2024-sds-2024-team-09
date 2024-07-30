namespace :videos do
  desc 'Import videos'
  task import: :environment do
    require 'fileutils'

    source_video_dir = '/Users/jingkaitan/Downloads/videos'
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

      # Use CarrierWave to assign the path
      File.open(file) do |f|
        video.path = f
      end

      if video.save
        puts "Imported: #{filename}"
      else
        puts "Failed to import: #{filename} - #{video.errors.full_messages.join(', ')}"
      end
    end
  end
end
