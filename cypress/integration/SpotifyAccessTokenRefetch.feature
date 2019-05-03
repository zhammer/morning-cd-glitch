Feature: Spotify Access Token Refetch

  Background:
    Given it is daytime

  Scenario: My spotify access token expires on the question page
    Given I am at "/question"
    When I type "something holy paper castles" which initially errors with a 401
    And I type "{backspace}{enter}s{enter}"
    # We have to reload the page at the moment, because of https://github.com/apollographql/apollo-link-rest/issues/150
    Then I see the song "Something Holy" by "Alice Phoebe Lou" from the album "Paper Castles"
