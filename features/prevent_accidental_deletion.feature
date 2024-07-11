Feature: Prevent accidental deletion of Recorded Videos of Child Crying

  As a guardian
  I want to be prompted for confirmation before deleting a video
  So that I can avoid accidental deletion of important videos

  Scenario: User attempts to delete a recorded video
    Given the user is on the Video History Page
    And there are recorded videos available
    When the user clicks on the "Delete" button for a video
    Then a confirmation dialog should appear
    When the user confirms the deletion
    Then the video should be deleted
    And the video should no longer appear on the Video History Page
    When the user cancels the deletion
    Then the video should not be deleted
    And the video should still appear on the Video History Page
