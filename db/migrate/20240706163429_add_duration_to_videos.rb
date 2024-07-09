class AddDurationToVideos < ActiveRecord::Migration[7.1]
  def change
    add_column :videos, :duration, :integer
  end
end
