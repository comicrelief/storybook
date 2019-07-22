describe('Select Field', () => {
  it('should load default story', () => {
    cy.loadStory('Select Field', 'SelectField')
      .matchImageSnapshot();
  });
});
