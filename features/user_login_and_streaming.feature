Feature: User Login and Streaming

  Scenario: User can broadcast camera stream
    Given a user exists
    Given the user is logged in
    When the user visits the camera page
    And the user clicks the "Join as Host" button and waits for "Local user 00001"
    Then the user should see "Local user 00001"

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
    Then the user should see "Log In"

  Scenario: Invalid Credentials
    When the user visits the login page
    And the user clicks the "Log In" button
    Then the user should see "Invalid email/password combination"

