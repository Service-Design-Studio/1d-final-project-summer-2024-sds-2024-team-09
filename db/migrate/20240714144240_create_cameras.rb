class CreateCameras < ActiveRecord::Migration[7.1]
  def change
    create_table :cameras do |t|
      t.string :app_id
      t.string :token
      t.string :channel
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
