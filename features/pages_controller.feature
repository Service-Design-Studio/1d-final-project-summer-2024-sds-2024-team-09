Feature: Camera Page Access

  Scenario: Accessing camera page when not logged in
    Given I am not logged in
    When I visit the camera page
    Then I should be redirected to the login page

  Scenario: Accessing camera page when logged in
    Given I am logged in
    When I visit the camera page
    Then I should see the camera page

  Scenario: User setting is assigned when logged in and visiting camera page
    Given I am logged in
    When I visit the camera page
    Then the user setting should be assigned
