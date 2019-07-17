describe('Postcode Lookup', () => {
  it('should load default story', () => {
    cy.loadStory('Postcode Lookup', 'PostcodeLookup')
      .matchImageSnapshot();
  });
});
