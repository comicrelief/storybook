describe('Footer', () => {
  it('should load Sport Relief story', () => {
    cy.loadStory('Footer', 'Sport Relief', 3000)
      .matchImageSnapshot();
  });
});
