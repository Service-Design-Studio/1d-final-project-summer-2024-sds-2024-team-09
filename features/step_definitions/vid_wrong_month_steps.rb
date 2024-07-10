Given('a video exists with a recorded date') do
    @video = Video.create(title: 'Test Video', file_path: 'test_video.mp4', created_at: Date.new(2023, 5, 15))
  end
  
  Given('the video is stored under a different month') do
    @video.update(created_at: Date.new(2023, 4, 15))
  end
  
  When('the user sorts videos by month') do
    visit videos_path(sort_by: 'month')
  end
  
  Then('the video should be listed under the correct month') do
    expect(page).to have_content('May 2023')
    expect(page).to have_no_content('April 2023')
  end
  