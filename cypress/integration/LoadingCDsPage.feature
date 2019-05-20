Feature: Loading CDs Page
  The Loading CDs Page is used as an initial loader for Morning CD - 8bit!

  Background:
    Given the internet is slow

  Scenario: Morning CD is loading
    When I visit "/question"
    Then I see the loading cds page
    And the progress bar has the value 100
    * Snap! *
    And the progress bar is blinking

  Scenario: Time is frozen
    Given time is frozen
    When I visit "/question"
    Then I see the loading cds page
    And the progress bar has the value 0
