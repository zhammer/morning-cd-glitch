Feature: Sundial
  The sundial keeps track of what time of day it is:
  before sunset, day, or after sunset.

  Background:
    Given the following sunlight windows
      | date       | sunriseUtc | sunsetUtc |
      | 2019-05-02 | 09:52:36   | 23:53:19  |
      | 2019-05-03 | 09:51:22   | 23:54:21  |
      | 2019-05-04 | 09:50:09   | 23:55:23  |

  Scenario Outline: It is <timeOfDay>
    Given the current datetime is "2019-05-03 <time>"
    # ^ this is local
    When I visit "/question"
    Then it is calibrating
    Then it is <timeOfDay>

    Examples:
      | time     | timeOfDay      |
      | 04:30:15 | before sunrise |
      | 13:15:20 | day            |
      | 20:15:10 | after sunset   |
