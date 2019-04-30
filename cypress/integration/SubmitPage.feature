Feature: Submit Page
  On the Submit Page, I can submit my song to morning cd. When I
  submit my song, I am brought to the Listens Page.

  Scenario Outline: I am on the submit page for <name>
    When I visit the submit page with the id "<id>"
    Then I see a container with the title "Submit Listen"
    And I see the song "<name>" by "<artist>" from the album "<album>"
    And I see a field with the label "Your Name"
    And I see a field with the label "Note (Optional)"
    And the submit button is disabled
    And the name input is selected

    Examples:
      | id                     | name                                                | artist                         | album                                        |
      | 4cHr9tKAv2sHQwj79tmCG8 | Whathegirlmuthafuckinwannadoo (feat. Janelle Monáe) | The Coup                       | Sorry To Bother You: The Soundtrack          |
      | 3o9lfY9tbv3S00atFxNki5 | Big Blue                                            | Vampire Weekend                | This Life / Unbearably White                 |
      | 2gSBJPEjYoj6UhsI25TC8r | I Miss You                                          | Harold Melvin & The Blue Notes | The Essential Harold Melvin & The Blue Notes |

  # TODO: Add text/link user can click to go back to the question page.
  # Test unexpected error
  Scenario: I am on the submit page for an invalid song id
    When I visit "/submit?id=invalid_track_id"
    Then I see the error text "Error! invalid id"

  Scenario: I submit a listen
    When I visit the submit page with the id "3o9lfY9tbv3S00atFxNki5"
    And I write the name "Zach"
    And I write the note "Favorite track off the new VW EP"
    And I submit the listen form
    Then I am redirected to "/listens"

  Scenario: I submit a listen without a note
    When I visit the submit page with the id "4cHr9tKAv2sHQwj79tmCG8"
    And I write the name "Zach"
    And I submit the listen form
    Then I am redirected to "/listens"

  Scenario: There is an error submitting my listen
    Given there is a problem with the graphql server
    When I visit the submit page with the id "4cHr9tKAv2sHQwj79tmCG8"
    And I write the name "Zach"
    And I submit the listen form
    Then I see the error text "Error!"

  Scenario: I submit a listen just using my keyboard
    When I visit the submit page with the id "3o9lfY9tbv3S00atFxNki5"
    And I type "Zach"
    And I hit tab
    And I type "Digging this new vampire weekend song"
    And I hit tab
    And I type enter to submit
    Then I am redirected to "/listens"

  Scenario Outline: I am on the submit page with bad query string "<query>" (<description>)
    When I visit "/submit<query>"
    Then I am redirected to "/question"

    Examples:
      | query      | description            |
      | id=1337    | missing question mark  |
      |            | empty query string     |
      | ?          | no query params        |
      | ?id=       | id is empty            |
      | ?id=1&id=2 | multiple ids           |
      | ?ID=1      | capitalized            |
      | /123       | route not query string |

