Feature: playwright test

Scenario: open the playwright site
    Given I open the playwright website
    When I clicked the link get started
    Then I should see the installation page