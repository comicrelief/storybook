describe('File Upload', () => {
  it('should load default story', () => {
    cy.loadStory('File Upload', 'File upload')
      .matchImageSnapshot();
  });
});
