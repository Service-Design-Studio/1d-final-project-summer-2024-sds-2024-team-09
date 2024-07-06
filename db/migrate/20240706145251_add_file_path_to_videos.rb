class AddFilePathToVideos < ActiveRecord::Migration[7.1]
  def change
    add_column :videos, :file_path, :string

    create_table "videos", force: :cascade do |t|
      t.string "title"
      t.string "file_path"
      t.datetime "created_at", precision: 6, null: false
      t.datetime "updated_at", precision: 6, null: false
    end
  end
end
