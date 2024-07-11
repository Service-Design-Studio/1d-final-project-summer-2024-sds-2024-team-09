Feature: Edit Video Title

  As a guardian
  I want to edit the title of a video
  So that I can update the video title and see a success alert

  Scenario: User edits the title of a video
    Given the user is on the Video History Page
    And there are recorded videos available
    When the user clicks the "Edit Title" button for a video
    And the user changes the title to "New Video Title"
    And the user clicks the "Save" button for the video
    Then the title should be updated to "New Video Title"
    And the user should see a success alert saying "Title saved successfully!"

