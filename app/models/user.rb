class User < ApplicationRecord
    before_save { self.email = email.downcase }
    has_secure_password
  
    validates :username, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true
    validates :password, presence: true, length: { minimum: 6 }, if: :password_digest_changed?


    has_one :user_setting, dependent: :destroy
    has_many :videos, dependent: :destroy
    # accepts_nested_attributes_for :user_setting
  end
  