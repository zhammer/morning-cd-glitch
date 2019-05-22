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
    And I see the header "# View source"
    And I see a link that includes "github.com/zhammer/morning-cd-8bit"
    And I see a link that includes "dashboard.cypress.io"
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
