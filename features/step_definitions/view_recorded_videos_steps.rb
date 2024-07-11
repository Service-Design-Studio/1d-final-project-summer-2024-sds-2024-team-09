Given('the user is on the Video History Page') do
  visit video_history_path
end

When('recorded videos are stored in the database') do
  @video1 = Video.create(title: 'Video 1', file_path: 'public\uploads\video\1\IMG_2735.mp4', created_at: Time.now)
  @video2 = Video.create(title: 'Video 2', file_path: 'public\uploads\video\2\IMG_2739.mp4', created_at: Time.now)
  @video3 = Video.create(title: 'Video 3', file_path: 'public\uploads\video\3\IMG_2769.mp4', created_at: Time.now)
end

Then('the user should be able to view the recorded videos on the Video History Page') do
  visit video_history_path

  expect(page).to have_content('Video 1')
  expect(page).to have_content('Video 2')
  expect(page).to have_content('Video 3')

  video1_link = find('a', text: 'Video 1')
  video2_link = find('a', text: 'Video 2')
  video3_link = find('a', text: 'Video 3')

  expect(video1_link[:href]).to eq('/uploads/video/1/IMG_2735.mp4')
  expect(video2_link[:href]).to eq('/uploads/video/2/IMG_2739.mp4')
  expect(video3_link[:href]).to eq('/uploads/video/3/IMG_2769.mp4')
end
