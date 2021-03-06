Feature: Question Page
  On the Question Page, I can search for the first song I listened to
  this morning. When I select a song, I am brought to the Submit Page.

  Background:
    Given it is day

  Scenario: I visit morning cd
    When I visit morning cd
    Then I am redirected to "/question"
    And I see the title "What was the first piece of music you listened to this morning?"
    And I see the song question input
    And the song question input is selected

  Scenario: I search for a song
    When I visit morning cd
    And I click the song question input
    And I type "Stay Flo"
    And I wait 300 milliseconds
    Then the song question input form has the text "Stay Flo"
    And I see the songs
      | name                          | artist     | album                                         |
      | Stay Flo                      | Solange    | When I Get Home                               |
      | Fresh I Stay - Single Version | Flo Rida   | Club Can't Handle Me                          |
      | Stay Around                   | MoonLander | Crash 19                                      |
      | Stay Flo                      | Malik West | I Like Me Better with Clear Skin & Rose Water |
      | Daddy Can't You Stay          | Flo        | Daddy Can't You Stay (feat. Paul Richmond)    |

  Scenario Outline: I select the song <name> by <artist>
    When I visit morning cd
    And I click the song question input
    And I type "Stay Flo{enter}"
    And I click the song "<name>" by "<artist>"
    Then I am redirected to "/submit" with the params "?id=<id>"

    Examples:
      | name                          | artist     | id                     |
      | Stay Flo                      | Solange    | 6GCIYIWUBSLontW6divqsw |
      | Fresh I Stay - Single Version | Flo Rida   | 6jB5qWNwnR5sUMrko9byyy |
      | Stay Around                   | MoonLander | 5zJPomIIxwqlrXLbdJmhiS |
      | Stay Flo                      | Malik West | 49d1VpxMfaL9W2CXFDnQg1 |
      | Daddy Can't You Stay          | Flo        | 5s9zvBJGNfT3HUbdTGucnr |

  Scenario: I search for another song
    When I visit morning cd
    And I click the song question input
    And I type "Stay Flo{enter}"
    And I type "{selectall}{backspace}"
    And I type "something holy paper castles"
    Then I see the songs
      | name           | artist           | album         |
      | Something Holy | Alice Phoebe Lou | Paper Castles |

  Scenario: I fix a typo while searching for a song
    When I visit morning cd
    And I click the song question input
    And I type "Stay Dl{leftarrow}{leftarrow}{del}F{rightarrow}o"
    Then the song question input form has the text "Stay Flo"

  Scenario: I click the browser back button after selecting a song
    When I visit morning cd
    And I click the song question input
    And I type "something holy paper castles"
    And I click the song "Something Holy" by "Alice Phoebe Lou"
    And I click the browser back button
    Then I am redirected to "/question"

  Scenario: I don't lose my progress when I look at the about page
    When I visit morning cd
    And I click the song question input
    And I type "Stay Flo"
    And I click the open about page button
    And I click the close about page button
    Then the song question input form has the text "Stay Flo"

  Scenario: The page doesn't unload when I select a song
    When I visit morning cd
    And I type "something holy paper castles"
    And I expect the page not to unload
    And I click the song "Something Holy" by "Alice Phoebe Lou"
    Then I am redirected to "/submit"
