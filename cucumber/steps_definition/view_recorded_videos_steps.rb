Given('the user is on the Video History Page') do
  visit video_history_path
end

When('recorded videos are stored in the database') do
  # @video1 = Video.create(title: 'Video A', file_path: 'public/uploads/video/1/IMG_2735.mp4', created_at: Time.now)
  # @video2 = Video.create(title: 'Video B', file_path: 'public/uploads/video/2/IMG_2739.mp4', created_at: Time.now)
  # @video3 = Video.create(title: 'Video C', file_path: 'public/uploads/video/3/IMG_2769.mp4', created_at: Time.now)
end

Then('the user should be able to view the recorded videos on the Video History Page') do
  visit video_history_path

#   expect(page).to have_content('Video A')
#   expect(page).to have_content('Video B')
#   expect(page).to have_content('Video C')

#   video1_link = find('a', text: 'Video A')
#   video2_link = find('a', text: 'Video B')
#   video3_link = find('a', text: 'Video C')

#   expect(video1_link[:href]).to eq('/uploads/video/1/IMG_2735.mp4')
#   expect(video2_link[:href]).to eq('/uploads/video/2/IMG_2739.mp4')
#   expect(video3_link[:href]).to eq('/uploads/video/3/IMG_2769.mp4')
# end
