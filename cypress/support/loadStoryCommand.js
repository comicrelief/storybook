Cypress.Commands.add("loadStory", (kind, story) => (
  Cypress.visit(`?selectedKind=${kind}&selectedStory=${story}&full=1`)
      .get('#storybook-preview-iframe')
      .iframe()
      .find('[data-test-id="container"]')
));
