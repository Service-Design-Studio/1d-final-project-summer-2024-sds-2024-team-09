class CreateSignalData < ActiveRecord::Migration[7.1]
  def change
    create_table :signal_data do |t|
      t.string :room
      t.text :data

      t.timestamps
    end
  end
end
