describe('Radio Buttons', () => {
  it('should load default story', () => {
    cy.loadStory('Radio Buttons', 'RadioButtons')
      .matchImageSnapshot();
  });
});
