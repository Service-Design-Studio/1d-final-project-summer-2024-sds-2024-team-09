Feature: Manage Videos
  As an admin
  I want to manage my videos
  So that I can verify they are stored in the database and can be viewed

  Scenario: Store and list a video
    Given a video user exists and is logged in
    When a new video with the title "My Test Video" and duration "120" is stored
    Then the video with title "My Test Video" should be listed in the database

  Scenario: Fail to store a video with invalid data
    Given a video user exists and is logged in
    When an invalid video with no title and duration "120" is attempted to be stored
    Then I should see an error message "Video Unavailable for Viewing"


