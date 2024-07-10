Given('the camera is disconnected') do
    @camera_status = :disconnected
  end
  
  When('the guardian tries to monitor the livestream') do
    visit livestream_path
  end
  
  Then('the guardian should see a message "Livestream is currently unavailable due to a long period of disconnection"') do
    expect(page).to have_content('Livestream is currently unavailable due to a long period of disconnection')
  end
  