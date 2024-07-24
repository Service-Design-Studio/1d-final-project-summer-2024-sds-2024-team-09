Feature: AI Monitoring/Classification Feature for Child Distress Cries

  As a parent of young children (3 to 9 years old),
  I want to use a tool that can differentiate between normal noises and distress cries
  So that I can be accurately informed about my children’s well-being and not be interrupted by false alarms.

  Background:
    Given that the audio input device is operational and monitoring ambient sounds

  Scenario: Correct Distress Cry Detection, First Cry (True Positive)
    Given Alice falls
    And Alice starts to cry
    When the system detects the first cry
    Then the system accurately identifies the cry as a high probability cry
    And a telegram message is sent to the parent
    And the first cry is logged as the start video and saved for video synthesis

  Scenario: Correct Distress Cry Detection, Subsequent Cry (True Positive)
    Given Alice is crying
    And Alice continues to cry
    When the system detects the subsequent cries
    Then the system accurately identifies the other cries
    And a timestamp is recorded for the cry
    And the last cry is logged as the end video for video synthesis

  Scenario: Correct Distress Cry Detection, Break between Crying (True Positive)
    Given Alice is crying
    And there is a break between the crying
    When the system detects that child has stopped crying for a while (low probability cry)
    Then the system saves that video as well and continues to detect for cries

  Scenario: Correct Distress Cry Detection, End of Cry Incident (True Positive)
    Given Alice stops crying after falling
    When the system no longer detects cries for a certain amount of time (currently 40s)
    Then the system starts to synthesize all videos (cry and no cry) from start video to end video
    And the combined video is edited with metadata
    And the combined video is uploaded to Google Cloud Storage

  Scenario: Ignoring Normal Noises (True Negative)
    Given the children are playing and making loud but non-distressful noises
    When the system detects these normal noises
    Then the tool correctly identifies these as low probability cries
    And a timestamp is not recorded

  Scenario: Did Not Detect Child Crying When They Are (False Negative)
    Given the child begins to cry
    When the tool detects the distress cry
    Then the tool fails to classify the distress cry as a distress cry
    And no timestamp is added
