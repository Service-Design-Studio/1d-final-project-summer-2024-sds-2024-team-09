Given('I am not logged in as a user') do
  visit logout_path if page.has_link?('Log Out')
end

Given('I am logged in as a user') do
  @user = create(:user)
  visit login_path
  fill_in 'Email', with: @user.email
  fill_in 'Password', with: @user.password
  click_button 'Log In'
end

Given('a user exists with email {string} and password {string}') do |email, password|
  @user = create(:user, email: email, password: password)
end

When('I log in with email {string} and password {string}') do |email, password|
  visit login_path
  fill_in 'Email', with: email
  fill_in 'Password', with: password
  click_button 'Log In'
end

When('I visit the login page') do
  visit login_path
end

When('I log out as a user') do
  page.driver.submit :delete, logout_path, {}
end

Then('I should see the login page') do
  expect(page).to have_content('Log In') # Adjust this line based on actual content
end

Then('I should be redirected to the home page') do
  expect(current_path).to eq(root_path)
end

Then('I should be logged in as a user') do
  expect(page).to have_current_path(root_path)
  expect(page).to have_content('Log Out') # Adjust this line based on actual content
end

Then('I should see the login page with an error') do
  expect(page).to have_content('Invalid email/password combination') # Adjust this line based on actual content
end

Then('I should be logged out as a user') do
  expect(page).to have_content('You must be logged in to access this section')
  expect(page).to have_content('Log In') # Adjust this line based on actual content
end
