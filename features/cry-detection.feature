Feature: AI Monitoring/Classification Feature for Child Distress Cries

  As a parent of young children (3 to 9 years old),
  I want to use a tool that can differentiate between normal noises and distress cries
  So that I can be accurately informed about my children’s well-being and not be interrupted by false alarms.

  Scenario: Correct Distress Cry Detection, First Cry (True Positive)
    When Alice starts to cry
    Then a telegram message is sent to the parent
    And the first cry is logged as the start video and saved for video synthesis

  Scenario: Correct Distress Cry Detection, Subsequent Cry (True Positive)
    When Alice continues to cry
    Then the last cry is logged as the end video for video synthesis

  Scenario: Correct Distress Cry Detection, Break between Crying (True Positive)
    When there is a break between the crying
    Then the system saves that video as well and continues to detect for cries

  Scenario: Correct Distress Cry Detection, End of Cry Incident (True Positive)
    When Alice stops crying after falling
    Then the system starts to synthesize all videos (cry and no cry) from start video to end video

  Scenario: Ignoring Normal Noises (True Negative)
    When the children are playing and making loud but non-distressful noises
    Then the video is discarded

