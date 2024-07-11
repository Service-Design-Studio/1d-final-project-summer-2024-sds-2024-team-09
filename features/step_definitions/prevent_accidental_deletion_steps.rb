Given('the user is on the Video History Page') do
  visit video_history_path
end

Given('there are recorded videos available') do
  @video1 = Video.create(title: 'Video 1', file_path: 'public\uploads\video\1\IMG_2735.mp4', created_at: Time.now)
  @video2 = Video.create(title: 'Video 2', file_path: 'public\uploads\video\2\IMG_2739.mp4', created_at: Time.now)
  @video3 = Video.create(title: 'Video 3', file_path: 'public\uploads\video\3\IMG_2769.mp4', created_at: Time.now)
  visit video_history_path
end

When('the user clicks on the "Delete" button for a video') do
  find(".delete-button[data-video-id='#{@video1.id}']").click
end

Then('a confirmation dialog should appear') do
  expect(page.driver.browser.switch_to.alert.text).to eq('Are you sure you want to delete this video?')
end

When('the user confirms the deletion') do
  page.driver.browser.switch_to.alert.accept
end

Then('the video should be deleted') do
  expect(Video.exists?(@video1.id)).to be_falsey
end

Then('the video should no longer appear on the Video History Page') do
  visit video_history_path
  expect(page).not_to have_content(@video1.title)
end

When('the user cancels the deletion') do
  page.driver.browser.switch_to.alert.dismiss
end

Then('the video should not be deleted') do
  expect(Video.exists?(@video1.id)).to be_truthy
end

Then('the video should still appear on the Video History Page') do
  visit video_history_path
  expect(page).to have_content(@video1.title)
end
