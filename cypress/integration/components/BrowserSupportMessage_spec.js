describe('BrowserSupportMessage component', () => {
  it('Should load successfully', () => {
    cy.visit('?selectedKind=Browser Support message&selectedStory=BrowserSupportMessage&full=1')
      .wait(2500)
      .get('#storybook-preview-iframe')
      .iframe()
      // .contains('Browser support message for IE9')
      // .find('#testtest')
      .find('[data-test-id="container"]')
      .matchImageSnapshot();
  });
});
