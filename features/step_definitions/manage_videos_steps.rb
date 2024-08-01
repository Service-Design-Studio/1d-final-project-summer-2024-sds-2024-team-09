Given('a video user exists and is logged in') do
  @user = FactoryBot.create(:user, password: 'password', password_confirmation: 'password')
  log_in(@user)
end

When('a new video with the title {string} and duration {string} is stored') do |title, duration|
  @video = FactoryBot.create(:video, title: title, duration: duration, user: @user)
  puts "Video stored with title: #{@video.title} and duration: #{@video.duration}"
end

When('an invalid video with no title and duration {string} is attempted to be stored') do |duration|
  @invalid_video = Video.new(duration: duration, user: @user)
  @invalid_video.save
end

Then('the video with title {string} should be listed in the database') do |title|
  video = Video.find_by(title: title)
  expect(video).not_to be_nil
end

Then('I should see an error message {string}') do |expected_message|
  response_body = page.body
  expect(response_body).to include(expected_message)
end

