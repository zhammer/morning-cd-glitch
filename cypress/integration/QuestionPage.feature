Feature: Question Page
  On the Question Page, I can search for the first piece of music
  I listened to this morning.

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

  Scenario: I fix a typo while searching for a song
    When I visit morning cd
    And I click the song question input
    And I type "Stay Dl{leftarrow}{leftarrow}{del}F{rightarrow}o"
    Then the song question input form has the text "Stay Flo"
