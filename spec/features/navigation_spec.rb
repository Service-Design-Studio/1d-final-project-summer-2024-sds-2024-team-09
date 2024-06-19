require 'rails_helper'

RSpec.feature "Navigation", type: :feature do
  scenario 'User navigates from index page to user page' do
    # Visit the index page
    visit '/'

    save_and_open_page

    # Click on the "User Page" link or button
    click_link 'User Page'

    # Expect to be on the user page
    expect(page).to have_current_path('/user')
    expect(page).to have_content('User Page')
  end
end
