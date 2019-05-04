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

  Scenario: I revisit morning cd a day after visiting
    Given it is day
    When I visit "/question"
    And I wait for the page to load
    And I leave the page
    And a day goes by
    And I visit "/question"
    And I wait for the page to load
    Then the browser sent the query "SunlightWindows" 2 times

  Scenario: Loader doesn't show on quick cache startup
    Given it is day
    When I visit "/question"
    And I see the loading cds page
    And I wait for the page to load
    And I leave the page
    And I visit "/question"
    Then I don't see the loading cds page
