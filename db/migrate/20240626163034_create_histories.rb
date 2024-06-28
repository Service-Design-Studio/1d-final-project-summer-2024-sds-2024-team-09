class CreateHistories < ActiveRecord::Migration[7.1]
  def change
    create_table :histories do |t|
      t.datetime :start_time
      t.datetime :end_time
      t.string :video_path

      t.timestamps
    end
  end
end
