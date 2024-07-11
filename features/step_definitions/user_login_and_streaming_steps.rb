require 'factory_bot'

Given('a user exists') do
  @user = FactoryBot.create(:user, 
                           username: 'hoooo', 
                           email: 'hooo@example.com', 
                           password: 'password')
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
  visit current_url
  click_button button
end

When('the user clicks the {string} button and waits for {string}') do |button, content|
  visit current_url
  click_button button
  expect(page).to have_content(content, wait: 10)
end

Then('the user should see {string}') do |content|
  expect(page).to have_content(content)
end

Given('another user is broadcasting') do
  using_session('broadcaster') do
    @broadcaster = FactoryBot.create(:user, 
                                     username: 'broadcaster', 
                                     email: 'broadcaster@gmail.com', 
                                     password: 'password')
    visit login_path
    fill_in 'Email', with: @broadcaster.email
    fill_in 'Password', with: @broadcaster.password
    click_button 'Log in'
    visit camera_broadcast_path
    click_button 'Join as host'
    expect(page).to have_content('Broadcasting Live')
  end
end

When('the user visits the camera broadcast page') do
  visit camera_broadcast_path
end

When('the user visits their profile page') do
  visit user_path(@user)
end

When('the user visits the login page') do
  visit login_path
end

When('the user fills in the {string} field with {string}') do |field, value|
  fill_in field, with: value
end

Then('the {string} field should contain {string}') do |field, value|
  expect(find_field(field).value).to eq value
end
