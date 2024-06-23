Feature: Live Camera Feed

  Scenario: Camera feed showing up
    Given that my camera is on
    When I visit the camera page
    Then I should see "the live camera feed"