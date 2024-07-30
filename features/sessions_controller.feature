Feature: User Sessions

  Scenario: Accessing login page when not logged in
    Given I am not logged in as a user
    When I visit the login page
    Then I should see the login page

  Scenario: Accessing login page when logged in
    Given I am logged in as a user
    When I visit the login page
    Then I should be redirected to the home page

  Scenario: Logging in with valid credentials
    Given a user exists with email "test@example.com" and password "password"
    When I log in with email "test@example.com" and password "password"
    Then I should be logged in as a user

  Scenario: Logging in with invalid credentials
    Given a user exists with email "test@example.com" and password "password"
    When I log in with email "test@example.com" and password "wrongpassword"
    Then I should see the login page with an error

  Scenario: Logging out
    Given I am logged in as a user
    When I log out as a user
    Then I should be logged out as a user
