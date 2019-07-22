describe('Grants Near You', () => {
  it('should load default story', () => {
    cy.loadStory('Grants Near You', 'GrantsNearYou')
      .matchImageSnapshot();
  });
});
