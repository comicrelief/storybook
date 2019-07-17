Cypress.Commands.add("loadStory", (kind, story, wait = 1000, dataTestId = 'container') => (
  cy.visit(`?selectedKind=${kind}&selectedStory=${story}&full=1`)
      .wait(wait)
      .get('#storybook-preview-iframe')
      .iframe()
      .find(`[data-test-id=${dataTestId}]`)
));
