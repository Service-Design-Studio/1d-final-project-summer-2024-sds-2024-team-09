class DropVideosTable < ActiveRecord::Migration[7.1]
  def change
    drop_table :videos, if_exists: true
  end
end
