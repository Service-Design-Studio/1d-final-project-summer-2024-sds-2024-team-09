Given('the user is on the Video History Page') do
  visit video_history_path
end

Given('there are recorded videos available') do
  @video1 = Video.create(title: 'Video A', file_path: 'public\uploads\video\1\IMG_2735.mp4', created_at: 1.day.ago)
  @video2 = Video.create(title: 'Video B', file_path: 'public\uploads\video\2\IMG_2739.mp4', created_at: 2.days.ago)
  @video3 = Video.create(title: 'Video C', file_path: 'public\uploads\video\3\IMG_2769.mp4', created_at: 3.days.ago)
  visit video_history_path
end

When('the user clicks on the {string} button') do |sort_option|
  click_button sort_option
end

Then('the videos should be sorted by title in {string} order') do |order|
  titles = all('.video-title').map(&:text)
  sorted_titles = order == 'ascending' ? titles.sort : titles.sort.reverse
  expect(titles).to eq(sorted_titles)
end

Then('the videos should be sorted by date in {string} order') do |order|
  dates = all('.card-text').select { |element| element.text.include?('Uploaded on:') }.map { |date| Time.parse(date.text.match(/Uploaded on: (.*) at/)[1]) }
  sorted_dates = order == 'ascending' ? dates.sort : dates.sort.reverse
  expect(dates).to eq(sorted_dates)
end
