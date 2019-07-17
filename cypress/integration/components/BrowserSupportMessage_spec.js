describe('Browser Support message', () => {
  it('should load default story', () => {
    cy.loadStory('Browser Support message', 'BrowserSupportMessage')
      .matchImageSnapshot();
  });
});
