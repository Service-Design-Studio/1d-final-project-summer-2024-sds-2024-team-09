require 'rails_helper'

RSpec.describe User, type: :model do
  it 'is valid with valid attributes' do
    user = User.new(username: 'TestUser', email: 'test@example.com', password: 'password')
    expect(user).to be_valid
  end

  it 'is not valid without a username' do
    user = User.new(username: nil, email: 'test@example.com', password: 'password')
    expect(user).not_to be_valid
  end

  it 'is not valid without a email' do
    user = User.new(username: 'TestUser', email: nil, password: 'password')
    expect(user).not_to be_valid
  end
end
