class CreateDevices < ActiveRecord::Migration[7.1]
  def change
    create_table :devices do |t|
      t.string :device_id
      t.string :uid

      t.timestamps
    end
  end
end
