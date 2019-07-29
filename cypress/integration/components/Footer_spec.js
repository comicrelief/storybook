describe('Footer', () => {
  it('should load Comic Relief story', () => {
    cy.loadStory('Footer', 'Comic Relief', 10000)
      .matchImageSnapshot();
  });

  it('should load Sport Relief story', () => {
    cy.loadStory('Footer', 'Sport Relief', 10000)
      .matchImageSnapshot();
  });

  it('should load Red Nose Day story', () => {
    cy.loadStory('Footer', 'Red Nose Day', 10000)
      .matchImageSnapshot();
  });
});
