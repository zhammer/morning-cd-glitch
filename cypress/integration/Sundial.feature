Feature: Sundial
  The sundial keeps track of what time of day it is:
  before sunset, day, or after sunset. These tests require
  that the local timezone is set to America/New_York.

  Background:
    Given I am in New York
    And these are the sunlight windows for new york
      | date       | sunriseUtc | sunsetUtc |
      | 2019-05-02 | 09:52:36   | 23:53:19  |
      | 2019-05-03 | 09:51:22   | 23:54:21  |
      | 2019-05-04 | 09:50:09   | 23:55:23  |
      | 2019-05-05 | 09:48:57   | 23:56:25  |

  Scenario Outline: It is <timeOfDay>
    Given the current datetime in new york is "2019-05-03 <time>"
    When I visit "/question"
    Then it is calibrating
    Then it is <timeOfDay>

    Examples:
      | time     | timeOfDay      |
      | 04:30:15 | before sunrise |
      | 13:15:20 | day            |
      | 20:15:10 | after sunset   |

  Scenario: The sun sets
    Given the current datetime in new york is "2019-05-03 13:15:20"
    When I visit "/question"
    And I see that it is day
    And 7 hours pass
    Then it is after sunset

  Scenario: The sun rises
    Given the current datetime in new york is "2019-05-03 04:15:20"
    When I visit "/question"
    And I see that it is before sunrise
    And 4 hours pass
    Then it is day

  Scenario: A new day comes
    Given the current datetime in new york is "2019-05-03 20:15:10"
    When I visit "/question"
    And I see that it is after sunset
    And 5 hours pass
    Then it is before sunrise

  Scenario: 24 hours pass
    Given the current datetime in new york is "2019-05-03 23:00:00"
    When I visit "/question"
    And I see that it is after sunset
    And 1 hours pass
    And I see that it is before sunrise
    And I wait a second for the sundial to recalibrate
    And 10 hours pass
    And I see that it is day
    And 13 hours pass
    Then it is after sunset
