Given('the user is on the Video History Page') do
  visit video_history_path
end

Given('there are recorded videos available') do
  @video1 = Video.create(title: 'Video A', file_path: 'public/uploads/video/1/IMG_2735.mp4', created_at: 2.days.ago)
  @video2 = Video.create(title: 'Video B', file_path: 'public/uploads/video/2/IMG_2739.mp4', created_at: 1.day.ago)
  @video3 = Video.create(title: 'Video C', file_path: 'public/uploads/video/3/IMG_2769.mp4', created_at: 3.days.ago)
end

When('the user clicks on the "Sort by Title Asc" button') do
  click_button 'Sort by Title Asc'
end

Then('the videos should be sorted by title in ascending order') do
  sorted_titles = page.all('a.video-title').map(&:text)
  expect(sorted_titles).to eq(['Video A', 'Video B', 'Video C'])
end

When('the user clicks on the "Sort by Title Desc" button') do
  click_button 'Sort by Title Desc'
end

Then('the videos should be sorted by title in descending order') do
  sorted_titles = page.all('a.video-title').map(&:text)
  expect(sorted_titles).to eq(['Video C', 'Video B', 'Video A'])
end

When('the user clicks on the "Sort by Date Asc" button') do
  click_button 'Sort by Date Asc'
end

Then('the videos should be sorted by date in ascending order') do
  sorted_dates = page.all('p.card-text').map(&:text).select { |text| text.include?('Uploaded on:') }
  sorted_dates = sorted_dates.map { |date_text| DateTime.parse(date_text.match(/Uploaded on: (.*) at/)[1]) }
  expect(sorted_dates).to eq(sorted_dates.sort)
end

When('the user clicks on the "Sort by Date Desc" button') do
  click_button 'Sort by Date Desc'
end

Then('the videos should be sorted by date in descending order') do
  sorted_dates = page.all('p.card-text').map(&:text).select { |text| text.include?('Uploaded on:') }
  sorted_dates = sorted_dates.map { |date_text| DateTime.parse(date_text.match(/Uploaded on: (.*) at/)[1]) }
  expect(sorted_dates).to eq(sorted_dates.sort.reverse)
end
