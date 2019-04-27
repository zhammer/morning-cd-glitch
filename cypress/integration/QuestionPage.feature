Feature: Question Page
  On the Question Page, I can search for the first song I listened to
  this morning. When I select a song, I am brought to the Submit Page.

  Scenario: I visit morning cd
    When I visit morning cd
    Then I see the title "What was the first piece of music you listened to this morning?"
    And I see the song question input

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
    And I type "Stay Flo"
    And I type "{Enter}"
    And I click the song "<name>" by "<artist>"
    Then I am redirected to "/submit" with the params "?id=<id>"

    Examples:
      | name                          | artist     | id                     |
      | Stay Flo                      | Solange    | 6GCIYIWUBSLontW6divqsw |
      | Fresh I Stay - Single Version | Flo Rida   | 6jB5qWNwnR5sUMrko9byyy |
      | Stay Around                   | MoonLander | 5zJPomIIxwqlrXLbdJmhiS |
      | Stay Flo                      | Malik West | 49d1VpxMfaL9W2CXFDnQg1 |
      | Daddy Can't You Stay          | Flo        | 5s9zvBJGNfT3HUbdTGucnr |



  Scenario: I fix a typo while searching for a song
    When I visit morning cd
    And I click the song question input
    And I type "Stay Dl{leftarrow}{leftarrow}{del}F{rightarrow}o"
    Then the song question input form has the text "Stay Flo"
