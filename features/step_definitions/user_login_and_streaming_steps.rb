Given('a user exists') do
  @user = FactoryBot.create(:user)
end

Given('the user is logged in') do
  visit login_path
  fill_in 'Email', with: @user.email
  fill_in 'Password', with: @user.password
  click_button 'Log In'
end

When('the user visits the camera page') do
  visit camera_path
end

When('the user clicks the {string} button') do |button|
  click_button button
end

Then('the user should see {string}') do |content|
  expect(page).to have_content(content)
end

Given('another user is broadcasting') do
  other_user = FactoryBot.create(:user, email: 'other@example.com', password: 'password', password_confirmation: 'password')
  visit login_path
  fill_in 'Email', with: other_user.email
  fill_in 'Password', with: other_user.password
  click_button 'Log In'
  
  visit camera_path
  click_button 'Join as Host'

  # Log out other user
  click_link 'Log Out'
end

When('the user visits the camera broadcast page') do
  visit camera_broadcast_path
end

When('the user visits their profile page') do
  visit user_path(@user)
end

When('the user visits the login page') do
  visit new_user_session_path
end

When('the user fills in the {string} field with {string}') do |field, value|
  fill_in field, with: value
end

Then('the {string} field should contain {string}') do |field, value|
  expect(find_field(field).value).to eq value
end

Then('the user should see {string}') do |content|
  expect(page).to have_content(content)
end
