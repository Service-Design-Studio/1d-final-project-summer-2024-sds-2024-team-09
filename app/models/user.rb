class User < ApplicationRecord
    before_save { self.email = email.downcase }
    has_secure_password
  
    validates :username, presence: true, uniqueness: { case_sensitive: false }
    validates :email, presence: true, uniqueness: { case_sensitive: false }

    has_one :user_setting, dependent: :destroy
  has_many :videos, dependent: :destroy
    # accepts_nested_attributes_for :user_setting
  end
  