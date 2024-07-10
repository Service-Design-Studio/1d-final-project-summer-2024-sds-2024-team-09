Feature: Unavailable Video
  As a user
  I want to be informed when a video is unavailable
  So that I am not left with a blank page

  Scenario: User tries to play an unavailable video
    Given a video exists in history
    And the video file is missing or corrupted
    When the user tries to play the video
    Then the user should see a message "Video is unavailable" instead of a blank page
