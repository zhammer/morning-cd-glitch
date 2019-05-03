Feature: Loading CDs Page
  The Loading CDs Page is used as an initial loader for morning-cd-glitch.

  Scenario: Morning CD is loading
    Given the internet is slow
    When I visit "/question"
    Then I see the loading cds page
    And the progress bar has the value 0
    Then some time passes
    And the progress bar has the value 100
    And the progress bar is blinking
