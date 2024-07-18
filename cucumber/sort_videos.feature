Feature: Guardian able to sort their video according to title or date

  Scenario: Sorting videos by title in ascending order
    Given the user is on the Video History Page
    And there are recorded videos available
    When the user clicks on the "Sort by Title Asc" button
    Then the videos should be sorted by title in ascending order

  Scenario: Sorting videos by title in descending order
    Given the user is on the Video History Page
    And there are recorded videos available
    When the user clicks on the "Sort by Title Desc" button
    Then the videos should be sorted by title in descending order

  Scenario: Sorting videos by date in ascending order
    Given the user is on the Video History Page
    And there are recorded videos available
    When the user clicks on the "Sort by Date Asc" button
    Then the videos should be sorted by date in ascending order

  Scenario: Sorting videos by date in descending order
    Given the user is on the Video History Page
    And there are recorded videos available
    When the user clicks on the "Sort by Date Desc" button
    Then the videos should be sorted by date in descending order