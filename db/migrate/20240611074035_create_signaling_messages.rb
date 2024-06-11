class CreateSignalingMessages < ActiveRecord::Migration[7.1]
  def change
    create_table :signaling_messages do |t|
      t.string :message_type
      t.text :data

      t.timestamps
    end
  end
end
