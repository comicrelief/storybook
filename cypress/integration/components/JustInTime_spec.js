describe('Just In Time Message', () => {
  it('should load default story', () => {
    cy.loadStory('Just In Time Message', 'JustInTime')
      .matchImageSnapshot();
  });
});
