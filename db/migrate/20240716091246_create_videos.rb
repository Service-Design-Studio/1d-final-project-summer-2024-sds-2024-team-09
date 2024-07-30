class CreateVideos < ActiveRecord::Migration[7.0]
  def change
    create_table :videos do |t|
      t.string :title
      t.string :file_path
      t.integer :duration
      t.integer :user_id
      t.datetime :recorded_at

      t.timestamps
    end

    add_index :videos, :user_id
  end
end
