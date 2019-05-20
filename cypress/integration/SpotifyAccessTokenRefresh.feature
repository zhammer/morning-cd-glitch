@ci-only
Feature: Spotify Access Token Refresh
  Because spotify access tokens expire every 1 hour, Morning CD - Glitch! should
  refresh the access token every 59 for a seamless user experience.

  Background:
    Given we have the ability to fast forward time
    And it is day

  Scenario: An hour goes by on the question page
    When I visit the question page
    And an hour goes by
    And I type "something holy paper castles"
    Then I send a request to spotify with the refreshed access token
    And I see the song "Something Holy" by "Alice Phoebe Lou" from the album "Paper Castles"
