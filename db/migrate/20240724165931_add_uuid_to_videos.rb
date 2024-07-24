class AddUuidToVideos < ActiveRecord::Migration[6.0]
  def change
    add_column :videos, :uuid, :string, null: false, default: ""

    reversible do |dir|
      dir.up do
        Video.find_each do |video|
          video.update_column(:uuid, SecureRandom.uuid)
        end
      end
    end
  end
end
