Given('the user is on the Video History Page') do
  visit video_history_path
end

Given('there are recorded videos available') do
  # @video1 = Video.create(title: 'Video A', file_path: 'public/uploads/video/1/IMG_2735.mp4', created_at: Time.now)
  # @video2 = Video.create(title: 'Video B', file_path: 'public/uploads/video/2/IMG_2739.mp4', created_at: Time.now)
  # @video3 = Video.create(title: 'Video C', file_path: 'public/uploads/video/3/IMG_2769.mp4', created_at: Time.now)
end

When('the user clicks on the "Delete" button for a video') do
  # Assuming we're clicking the delete button for Video A
  find('button', text: 'Delete', match: :first).click
end

Then('a confirmation dialog should appear') do
  expect(page.driver.browser.switch_to.alert.text).to eq('Are you sure you want to delete this video?')
end

When('the user confirms the deletion') do
  page.driver.browser.switch_to.alert.accept
end

Then('the video should be deleted') do
  # Wait for the video to be deleted
  expect(page).not_to have_content('Video A')
end

Then('the video should no longer appear on the Video History Page') do
  expect(page).not_to have_content('Video A')
end

When('the user cancels the deletion') do
  find('button', text: 'Delete', match: :first).click
  page.driver.browser.switch_to.alert.dismiss
end

Then('the video should not be deleted') do
  expect(page).to have_content('Video A')
end

Then('the video should still appear on the Video History Page') do
  expect(page).to have_content('Video A')
end
