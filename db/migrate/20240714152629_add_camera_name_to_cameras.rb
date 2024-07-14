class AddCameraNameToCameras < ActiveRecord::Migration[7.1]
  def change
    add_column :cameras, :camera_name, :string
  end
end
