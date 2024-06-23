require 'rails_helper'

RSpec.feature "BroadcastPage", type: :feature do
  scenario "Watch the broadcast opens broadcast camera" do
    visit camera_broadcast_path
    click_on "Watch Broadcast"
    expect(page).to have_content('Remote user')
  end

  scenario "Leave broadcast redirects to user page" do
    visit camera_broadcast_path
    click_on "Leave Broadcast"
    expect(page).to have_current_path(user_page_path)
  end
end
