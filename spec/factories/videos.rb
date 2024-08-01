require 'stringio'

FactoryBot.define do
  factory :video do
    title { "My Test Video" }
    duration { 120 }
    file {
      Rack::Test::UploadedFile.new(
        StringIO.new("This is a test video file content"),
        "video/mp4",
        original_filename: "test_video.mp4"
      )
    }
    association :user
  end
end
