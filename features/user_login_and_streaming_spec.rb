require 'rails_helper'

RSpec.feature "UserLoginAndStreaming", type: :feature do
  let(:user) { FactoryBot.create(:user) }

  before do
    visit login_path
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    click_button 'Log In'
  end

  scenario 'User can broadcast camera stream' do
    visit camera_path

    # Assuming there's a button to start broadcasting
    click_button 'Join as Host'

    # Check if the broadcast started, you may need to adjust this based on your app's behavior
    expect(page).to have_content('Local user')
  end

  scenario 'User can view the camera stream' do
    visit camera_path

    # Simulate another user broadcasting
    # This step might need to be adjusted based on how your app handles multiple users
    broadcast_camera_stream_as_another_user

    visit camera_broadcast_path

    # Check if the stream is visible
    expect(page).to have_content('Watching Live')
  end

  scenario 'Total streaming devices should be 0 when there is no broadcast' do
    visit user_path(user)

    expect(page).to have_content('Total Streaming Devices: 0')
  end

  private

  def broadcast_camera_stream_as_another_user
    other_user = FactoryBot.create(:user, email: 'other@example.com', password: 'password', password_confirmation: 'password')
    visit login_path
    fill_in 'Email', with: other_user.email
    fill_in 'Password', with: other_user.password
    click_button 'Log In'
    
    visit camera_path
    click_button 'Join as Host'
    
    # Log out and log back in as the original user
    click_link 'Log Out'
    visit login_path
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    click_button 'Log In'
  end
end
