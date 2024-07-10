class DropVideosTable < ActiveRecord::Migration[7.1]
  def change
    drop_table :videos
  end
end
