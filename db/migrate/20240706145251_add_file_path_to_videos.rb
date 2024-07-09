class AddFilePathToVideos < ActiveRecord::Migration[7.1]
  def change
    unless column_exists?(:videos, :file_path)
      add_column :videos, :file_path, :string
    end
  end
end

