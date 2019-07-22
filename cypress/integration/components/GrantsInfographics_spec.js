describe('Grants Infographics', () => {
  it('should load default story', () => {
    cy.loadStory('Grants Infographics', 'data visualisation')
      .matchImageSnapshot();
  });
});
