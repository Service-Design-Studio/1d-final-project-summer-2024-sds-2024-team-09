class BackfillUuidInVideos < ActiveRecord::Migration[7.1]
  def up
    Video.reset_column_information
    Video.find_each do |video|
      video.update_column(:uuid, SecureRandom.uuid)
    end
  end

  def down
    # No rollback needed for backfill
  end
end
