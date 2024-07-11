Feature: Guardian able to sort their video according to title or date

  Scenario: Sorting videos by title in ascending order
    Given the user is on the Video History Page
    And there are recorded videos available
    When the user clicks on the "Sort by Title Ascending" button
    Then the videos should be sorted by title in ascending order

  Scenario: Sorting videos by title in descending order
    Given the user is on the Video History Page
    And there are recorded videos available
    When the user clicks on the "Sort by Title Descending" button
    Then the videos should be sorted by title in descending order

  Scenario: Sorting videos by date in ascending order
    Given the user is on the Video History Page
    And there are recorded videos available
    When the user clicks on the "Sort by Date Ascending" button
    Then the videos should be sorted by date in ascending order

  Scenario: Sorting videos by date in descending order
    Given the user is on the Video History Page
    And there are recorded videos available
    When the user clicks on the "Sort by Date Descending" button
    Then the videos should be sorted by date in descending order
