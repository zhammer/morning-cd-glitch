Feature: Storage Persistence
  Some state can be persisted to the browser to speed up subsequent
  loads of Morning CD.

  Scenario: I refresh morning cd after visiting
    Given it is day
    When I visit "/question"
    And I wait for the page to load
    And I refresh the page
    And I wait for the page to load
    Then the browser sent the query "SunlightWindows" 1 time
