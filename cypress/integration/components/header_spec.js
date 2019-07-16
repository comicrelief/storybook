describe('User should see header section', () => {
  it('Verify title and header element', () => {
    cy.visit('/')
      .wait(2500)
      .reload(true);
    cy.title().should('eq', 'Storybook');
  });
});
