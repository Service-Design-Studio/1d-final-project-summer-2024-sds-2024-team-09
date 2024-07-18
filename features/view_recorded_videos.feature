Feature: View Recorded Videos of Child Crying

  As a user
  I want to view recorded videos
  So that I can watch them after the livestream ends

  Scenario: Successfully viewing a new recorded video
    Given a livestream is being recorded
    And the recorded video is stored in Google Cloud
    When a new video entry is added to the database
    Then I should be able to view the recorded video from the database
    And the video's URL should be accessible


# features/user_creation.feature
Feature: User creation
  As an admin
  I want to create a new user
  So that the user can log in to the application

  Scenario: Successfully creating a new user
    Given I am an admin
    When I create a user with email "test@example.com" and password "password"
    Then I should see the user with email "test@example.com" in the database