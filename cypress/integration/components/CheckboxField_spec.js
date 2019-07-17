describe('Checkbox Field', () => {
  it('should load default story', () => {
    cy.loadStory('Checkbox Field', 'CheckboxField')
      .matchImageSnapshot();
  });

  it('should click checkbox', () => {
    cy.loadStory('Checkbox Field', 'CheckboxField')
      .find('[data-test-id=input]')
      .click()
      .parents('[data-test-id=container]')
      .matchImageSnapshot();
  });
});
