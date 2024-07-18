Feature: Wrong Month Video Storage
  As a guardian
  I want videos to be sorted by the correct month
  So that I can easily find videos according to their uploaded date

  Scenario: Video stored in the wrong month
    Given a video exists with a recorded date
    And the video is stored under a different month
    When the user sorts videos by month
    Then the video should be listed under the correct month