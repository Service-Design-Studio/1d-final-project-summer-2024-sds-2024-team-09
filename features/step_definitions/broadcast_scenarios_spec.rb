require 'rails_helper'

RSpec.feature "BroadcastScenarios", type: :feature do
  scenario "Parent wanting to explore pages" do
    visit root_path
    click_on "Camera Page"
    expect(page).to have_current_path(camera_path)
    click_on "Leave"
    expect(page).to have_current_path(root_path)
    click_on "User Page"
    expect(page).to have_current_path(user_page_path)
    click_on "Watch Live"
    expect(page).to have_current_path(camera_broadcast_path)
    click_on "Leave Broadcast"
    expect(page).to have_current_path(user_page_path)
  end

  scenario "Parent successfully accessing broadcast page" do
    visit root_path
    click_on "User Page"
    expect(page).to have_current_path(user_page_path)
    click_on "Watch Live"
    expect(page).to have_current_path(camera_broadcast_path)
    click_on "Watch Broadcast"
    expect(page).to have_content('Remote user')
  end

  scenario "Parent accessing broadcast page with camera off" do
    visit root_path
    click_on "User Page"
    expect(page).to have_current_path(user_page_path)
    click_on "Watch Live"
    expect(page).to have_current_path(camera_broadcast_path)
    click_on "Watch Broadcast"
    expect(page).not_to have_content('Remote user')
    click_on "Leave Broadcast"
    expect(page).to have_current_path(user_page_path)
  end
end
