Given('the user is on the Video History Page') do
  visit video_history_path
end

Given('there are recorded videos available') do
#   @video = Video.create(title: 'Old Video Title', file_path: 'public/uploads/video/1/IMG_2735.mp4', created_at: Time.now)
# end

When('the user clicks the "Edit Title" button for a video') do
  find('.edit-button', match: :first).click
end

When('the user changes the title to {string}') do |new_title|
  fill_in 'video_title', with: new_title
end

When('the user clicks the "Save" button for the video') do
  find('.save-button', match: :first).click
end

Then('the title should be updated to {string}') do |new_title|
  expect(page).to have_content(new_title)
end

Then('the user should see a success alert saying {string}') do |alert_message|
  expect(page).to have_content(alert_message)
end
