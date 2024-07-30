class AddIsCriticalToVideos < ActiveRecord::Migration[7.1]
  def change
    add_column :videos, :is_critical, :boolean, default: false
  end
end
