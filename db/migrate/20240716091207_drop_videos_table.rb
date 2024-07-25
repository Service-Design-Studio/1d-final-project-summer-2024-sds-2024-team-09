class DropVideosTable < ActiveRecord::Migration[7.0]
  def change
    drop_table :videos
  end
end
