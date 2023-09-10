Feature: Get Dummy By Name

Scenario: Getting a dummy
  Given I provide a valid name
  When I attempt to get a dummy
  Then the dummy should be returned successfully