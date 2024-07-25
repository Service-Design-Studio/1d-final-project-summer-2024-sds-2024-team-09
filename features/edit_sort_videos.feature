Feature: Edit and Sort Videos
  As an admin
  I want to manage my videos
  So that I can edit their titles and sort them

  Scenario: Successfully edit a video title
    Given a video user exists and is logged in for editing and sorting
    And a video with the title "Old Title" and duration "120" exists
    When I edit the video title to "New Title"
    Then I should see the video with title "New Title" in the list

  Scenario: Fail to edit a video title to an empty string
    Given a video user exists and is logged in for editing and sorting
    And a video with the title "Old Title" and duration "120" exists
    When I attempt to edit the video title to an empty string
    Then I should see an error message "Video title can't be blank"

  Scenario: Sort videos by title in ascending order
    Given a video user exists and is logged in for editing and sorting
    And videos with titles "B Title" and "A Title" exist
    When I sort videos by title ascending
    Then the first video should have the title "A Title"

  Scenario: Sort videos by duration in descending order
    Given a video user exists and is logged in for editing and sorting
    And videos with durations "120" and "90" exist
    When I sort videos by duration descending
    Then the first video should have the duration "120"
