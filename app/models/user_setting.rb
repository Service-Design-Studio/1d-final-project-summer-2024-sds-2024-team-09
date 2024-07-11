class UserSetting < ApplicationRecord
  belongs_to :user
  serialize :emails, JSON
end
