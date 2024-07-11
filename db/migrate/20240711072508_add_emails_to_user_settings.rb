class AddEmailsToUserSettings < ActiveRecord::Migration[7.1]
  def change
    add_column :user_settings, :emails, :text, default: [].to_yaml
  end
end
