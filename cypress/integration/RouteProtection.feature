Feature: Route Protection
  Some routes should only be accessible under certain conditions. E.g., a
  user shouldn't be able to visit the Question Page during the night or if
  the user has already submitted a listen that day.

  Scenario Outline: I visit the day only route <route> at <timeOfDay>
    Given it is <timeOfDay>
    When I visit "<route>"
    Then I am redirected to "/listens"

    Examples:
      | route          | timeOfDay      |
      | /question      | before sunrise |
      | /question      | after sunset   |
      | /submit?id=123 | before sunrise |
      | /submit?id=123 | after sunset   |

  Scenario Outline: I visit the route <route> after already submitting a listen today
    Given it is day
    And I have submitted a listen today
    When I visit "<route>"
    Then I am redirected to "/listens"

    Examples:
      | route          |
      | /question      |
      | /submit?id=123 |

  Scenario Outline: I visit <route> after last submitting a listen days ago
    Given it is day
    And I have last submitted a listen a few days ago
    When I visit "<route>"
    Then I am still on "<route>"

    Examples:
      | route          |
      | /question      |
      | /submit?id=123 |

