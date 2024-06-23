require 'rails_helper'

RSpec.feature "UserPage", type: :feature do
  scenario "User navigates to camera broadcast page" do
    visit user_page_path
    click_on "Watch Live"
    expect(page).to have_current_path(camera_broadcast_path)
  end
end
