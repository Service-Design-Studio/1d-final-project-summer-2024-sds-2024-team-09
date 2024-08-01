Given('a video user exists and is logged in for editing and sorting') do
  @user = FactoryBot.create(:user)
  login_as(@user)
end

Given('a video with the title {string} and duration {string} exists') do |title, duration|
  @user ||= User.last # Assuming the last created user
  FactoryBot.create(:video, title: title, duration: duration.to_i, user: @user)
end

When('I edit the video title to {string}') do |new_title|
  visit video_history_path
  find('.edit-button', match: :first).click
  within '.card-body', match: :first do
    find('.video-title-input').set(new_title)
    find('.save-button').click
  end
end

Then('I should see the video with title {string} in the list') do |new_title|
  visit video_history_path
  expect(page).to have_content(new_title)
end

When('I attempt to edit the video title to an empty string') do
  visit video_history_path
  find('.edit-button', match: :first).click
  within '.card-body', match: :first do
    find('.video-title-input').set('')
    find('.save-button').click
  end
end

Then('I should see an error message {string}') do |message|
  expect(page).to have_content(message)
end

Given('videos with titles {string} and {string} exist') do |title1, title2|
  @user ||= User.last # Assuming the last created user
  FactoryBot.create(:video, title: title1, user: @user)
  FactoryBot.create(:video, title: title2, user: @user)
end

When('I sort videos by title ascending') do
  visit video_history_path
  click_button 'Sort by Title Asc'
end

Then('the first video should have the title {string}') do |title|
  first_video = find('#video-list .card-title', match: :first)
  expect(first_video).to have_content(title)
end

Given('videos with durations {string} and {string} exist') do |duration1, duration2|
  @user ||= User.last # Assuming the last created user
  FactoryBot.create(:video, duration: duration1.to_i, user: @user)
  FactoryBot.create(:video, duration: duration2.to_i, user: @user)
end

When('I sort videos by duration descending') do
  visit video_history_path
  click_button 'Sort by Duration Desc'
end

Then('the first video should have the duration {string}') do |duration|
  first_video_duration = find('#video-list .card-text', match: :first)
  expect(first_video_duration).to have_content("#{duration} seconds")
end
