Given('a video exists in history') do
    @video = Video.create(title: 'Test Video', file_path: 'test_video.mp4')
  end
  
  Given('the video file is missing or corrupted') do
    allow(File).to receive(:exist?).with(@video.file_path).and_return(false)
  end
  
  When('the user tries to play the video') do
    visit video_path(@video)
    click_button 'Play'
  end
  
  Then('the user should see a message "Video is unavailable" instead of a blank page') do
    expect(page).to have_content('Video is unavailable')
  end
  