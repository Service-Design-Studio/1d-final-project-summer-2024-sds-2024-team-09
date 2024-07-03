class CreateVideos < ActiveRecord::Migration[7.1]
  def change
    create_table :videos do |t|
      t.string :title
      t.date :date
      t.string :path

      t.timestamps
    end
  end
end
