class CreateVideos < ActiveRecord::Migration[6.1]
  def change
    # create_table :videos do |t|
    #   t.string :title
    #   t.string :file_path

    #   t.timestamps
    # end
    create_table "videos", force: :cascade do |t|
      t.string "title"
      t.string "file_path"
      t.datetime "created_at", precision: 6, null: false
      t.datetime "updated_at", precision: 6, null: false
    end
  end
end
