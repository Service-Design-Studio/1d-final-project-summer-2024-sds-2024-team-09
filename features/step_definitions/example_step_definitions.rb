When('I visit the home page') do
  visit root_path
end

When('I visit the user page') do
  visit user_path
end

When('I visit the camera page') do
  visit camera_path
end

When('I visit the camera broadcast page') do
  visit camera_broadcast_path
end

Then('I should see {string}') do |content|
  expect(page).to have_content(content)
end
