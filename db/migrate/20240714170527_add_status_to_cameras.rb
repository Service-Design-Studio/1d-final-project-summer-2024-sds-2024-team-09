class AddStatusToCameras < ActiveRecord::Migration[7.1]
  def change
    add_column :cameras, :status, :string, default:'Not Live', null:false
  end
end
