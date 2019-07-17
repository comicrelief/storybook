describe('Checkbox Field', () => {
  it('should load default story', () => {
    cy.loadStory('Checkbox Field', 'CheckboxField')
      .matchImageSnapshot();
  });
});
