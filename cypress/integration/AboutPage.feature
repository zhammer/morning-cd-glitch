Feature: About Page
  On the about page, I can see information about Morning CD - 8bit!
  I can visit the about page by clicking the about page toggle button.

  Scenario: I visit the about page
    Given it is day
    And I have not submitted a listen today
    When I visit "/question"
    And I click the open about page button
    Then I see the title "Morning CD - 8bit!"
    * Snap! *
    And I see the header "# About"
    And I see a link that includes "spotify.com"
    And I see the header "# Share"
    And I see a link that includes "facebook.com"
    And I see a link that includes "twitter.com"
    And I see a link that includes "linkedin.com"
    And I see a link that includes "mailto"
    And I see the header "# Credits"
    And I see a link that includes "/in/zach-hammer"
    And I see a link that includes "jodyavirgan"
    And I see a link that includes "NES.css"
    And I see the header "# Code Stuff"
    And I see a link that includes "github.com/zhammer/morning-cd-8bit"
    And I see a link that includes "dashboard.cypress.io"
    And I see the super mario brick block
    And I see the close about page button

  Scenario Outline: I toggle the about page from <route>
    Given it is <timeOfDay>
    And I <haveOrHaveNotSubmitted> a listen today
    When I visit "<route>"
    And I click the open about page button
    And the about page loads
    And I click the close about page button
    Then I am at "<route>"

    Examples:
      | route          | timeOfDay    | haveOrHaveNotSubmitted |
      | /question      | day          | have not submitted     |
      | /submit?id=123 | day          | have not submitted     |
      | /listens       | after sunset | have not submitted     |
      | /listens       | after sunset | have submitted         |
      | /listens       | day          | have submitted         |

  @ci-only
  Scenario Outline: I don't click the super mario brick block quickly enough to show the fire flower
    Given we have the ability to fast forward time
    And it is day
    When I visit "/"
    And I click the open about page button
    And I click the super mario brick block <numberOfClicks> times
    And I wait 8.0 seconds
    And I click the super mario brick block
    Then I see the done block
    And I don't see the fire flower

    Examples:
      | numberOfClicks |
      | 1              |
      | 10             |

  @ci-only
  Scenario: I click the super mario brick block quickly enough to show the fire flower
    Given we have the ability to fast forward time
    And it is day
    When I visit "/"
    And I click the open about page button
    And I click the super mario brick block 11 times
    Then I see the done block
    And I see the fire flower
    * Snap! *
    And the fire flower has the link "https://github.com/zhammer/morning-cd-8bit/pull/37"
