Feature: Pages

  Scenario: Visit the home page
    When I visit the home page
    Then I should see "some content specific to home page"

  Scenario: Visit the user page
    When I visit the user page
    Then I should see "some content specific to user page"

  Scenario: Visit the camera page
    When I visit the camera page
    Then I should see "some content specific to camera page"

  Scenario: Visit the camera broadcast page
    When I visit the camera broadcast page
    Then I should see "some content specific to camera broadcast page"