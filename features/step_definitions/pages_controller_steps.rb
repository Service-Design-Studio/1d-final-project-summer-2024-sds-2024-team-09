Given('I am not logged in') do
  visit logout_path if page.has_link?('Logout')
end

Given('I am logged in') do
  @user = create(:user)
  visit login_path
  fill_in 'Email', with: @user.email
  fill_in 'Password', with: @user.password
  click_button 'Log In'
end

When('I visit the camera page') do
  visit camera_path
end

Then('I should be redirected to the login page') do
  expect(current_path).to eq(login_path)
end

Then('I should see the camera page') do
  expect(page).to have_content('Camera Page') # Adjust this line based on actual content
end

Then('the user setting should be assigned') do
  @user_setting = UserSetting.find_by(user_id: @user.id)
  expect(@user_setting).not_to be_nil
end
