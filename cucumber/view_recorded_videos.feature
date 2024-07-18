Feature: View Recorded Videos of Child Crying

  As a parent
  I want to view snippets of my child crying from the database
  So that I can monitor their well-being

  Scenario: View recorded videos on Video History Page
    Given the user is on the Video History Page
    When recorded videos are stored in the database
    Then the user should be able to view the recorded videos on the Video History Page
