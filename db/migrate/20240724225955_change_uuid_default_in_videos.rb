# class ChangeUuidDefaultInVideos < ActiveRecord::Migration[7.1]
#   def change
#     change_column_default :videos, :uuid, -> { "gen_random_uuid()" }
#   end
# end
class ChangeUuidDefaultInVideos < ActiveRecord::Migration[7.1]
  def up
    add_column :videos, :uuid, :string, default: -> { "replace(hex(randomblob(16)), '-', '')" }

    Video.reset_column_information
    Video.find_each do |video|
      video.update_column(:uuid, SecureRandom.uuid) if video.uuid.blank?
    end

    change_column_default :videos, :uuid, from: nil, to: -> { "replace(hex(randomblob(16)), '-', '')" }
  end

  def down
    change_column_default :videos, :uuid, from: -> { "replace(hex(randomblob(16)), '-', '')" }, to: nil
  end
end
