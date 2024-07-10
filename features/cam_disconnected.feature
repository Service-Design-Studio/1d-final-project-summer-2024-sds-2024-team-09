Feature: Long Period of Disconnection of Camera
  As a guardian
  I want to be informed about long periods of disconnection
  So that I am aware of potential issues with monitoring

  Scenario: Guardian unable to monitor child due to disconnection
    Given the camera is disconnected
    When the guardian tries to monitor the livestream
    Then the guardian should see a message "Livestream is currently unavailable due to a long period of disconnection"
