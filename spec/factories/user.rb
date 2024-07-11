FactoryBot.define do
    factory :user do
      username { 'TestUser' }
      email { 'test@example.com' }
      password { 'password' }
      password_confirmation { 'password' }
    end
  end