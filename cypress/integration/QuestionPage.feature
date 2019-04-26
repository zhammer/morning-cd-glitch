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
    Then the song question input form has the text "Stay Flo"

  Scenario: I fix a typo while searching for a song
    When I visit morning cd
    And I click the song question input
    And I type "Stay Dl{leftarrow}{leftarrow}{del}F{rightarrow}o"
    Then the song question input form has the text "Stay Flo"
