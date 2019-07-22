describe('Postcode Lookup', () => {
  it('should load default story', () => {
    cy.loadStory('Postcode Lookup', 'PostcodeLookup')
      .matchImageSnapshot();
  });

  it('should load results', () => {
    cy.loadStory('Postcode Lookup', 'PostcodeLookup')
      .findByCustomId('postcode_lookup_input')
      .type('SE1 7TP')
      .parentsByCustomId('postcode_lookup_container')
      .findByCustomId('postcode_lookup_search')
      .click()
      .wait(3000)
      .parents('[data-test-id=container]')
      .matchImageSnapshot();
  });
});
