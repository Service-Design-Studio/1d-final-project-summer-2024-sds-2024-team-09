require 'rails_helper'

RSpec.feature "CameraScenarios", type: :feature do
  scenario "Parent setting up camera" do
    visit root_path
    click_on "Camera Page"
    expect(page).to have_current_path(camera_path)
    click_on "Join as Host"
    expect(page).to have_content('Local user')
  end

  scenario "Parent trying out camera" do
    visit root_path
    click_on "Camera Page"
    expect(page).to have_current_path(camera_path)
    click_on "Join as Host"
    expect(page).to have_content('Local user')
    click_on "Leave"
    expect(page).to have_current_path(root_path)
  end
end
