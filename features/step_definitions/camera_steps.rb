require 'rails_helper'

RSpec.feature "CameraPage", type: :feature do
  scenario "Join as host opens camera" do
    visit camera_path
    click_on "Join as Host"
    expect(page).to have_content('Local user')
  end

  scenario "Leave without camera open redirects to index" do
    visit camera_path
    click_on "Leave"
    expect(page).to have_current_path(root_path)
  end

  scenario "Leave with camera open closes camera and redirects to index" do
    visit camera_path
    click_on "Join as Host"
    click_on "Leave"
    expect(page).to have_current_path(root_path)
  end
end
