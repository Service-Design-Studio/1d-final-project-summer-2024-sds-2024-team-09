class CreateUserSettings < ActiveRecord::Migration[7.1]
  def change
    create_table :user_settings do |t|
      t.references :user, null: false, foreign_key: true
      t.string :app_id
      t.string :token
      t.string :channel

      t.timestamps
    end
  end
end
