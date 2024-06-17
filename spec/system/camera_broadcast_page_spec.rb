# spec/system/camera_broadcast_page_spec.rb
require 'rails_helper'

RSpec.describe 'Camera Broadcast Page', type: :system, js: true do
  before do
    driven_by(:selenium_chrome_headless)
  end

  it 'displays the Camera Broadcast Page with join and leave buttons' do
    visit root_path

    expect(page).to have_content('Camera Broadcast Page')
    expect(page).to have_button('Watch the broadcast')
    expect(page).to have_button('Leave the broadcast')
  end

  it 'joins the broadcast when the Watch button is clicked' do
    visit root_path

    click_button 'Watch the broadcast'
    
    # Assuming there is some indication that the broadcast has started,
    # add an expectation here. For example:
    expect(page).to have_content('Remote user')
  end

  it 'leaves the broadcast when the Leave button is clicked' do
    visit root_path

    click_button 'Watch the broadcast'
    click_button 'Leave the broadcast'
    
    # Assuming there is some indication that the broadcast has stopped,
    # add an expectation here. For example:
    expect(page).not_to have_content('Remote user')
  end
end
