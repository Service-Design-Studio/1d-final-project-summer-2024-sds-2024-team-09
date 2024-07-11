Feature: User Login and Streaming

  Scenario: User can broadcast camera stream
    Given a user exists
    Given the user is logged in
    When the user visits the camera page
    And the user clicks the "Join as Host" button
    Then the user should see "Local user"

  Scenario: User can view the camera stream
    Given a user exists
    And another user is broadcasting
    And the user is logged in
    When the user visits the camera broadcast page
    Then the user should see "Watching Live"

  Scenario: Total streaming devices should be 0 when there is no broadcast
    Given a user exists
    And the user is logged in
    When the user visits their profile page
    Then the user should see "Total Streaming Devices: 0"

  Scenario: User can visit the login page
    When the user visits the login page
    Then the user should see "Login"

  Scenario: User can fill in fields with values
    When the user visits the login page
    And the user fills in the "Email" field with "test@example.com"
    And the user fills in the "Password" field with "password"
    Then the "Email" field should contain "test@example.com"
    And the "Password" field should contain "password"

  Scenario: User can click a button
    When the user visits the login page
    And the user clicks the "Log In" button
    Then the user should see "Welcome"

  Scenario: User can see content on the page
    When the user visits the login page
    Then the user should see "Login"
