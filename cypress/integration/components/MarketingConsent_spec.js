describe('Marketing Consent', () => {
  it('should load default story', () => {
    cy.loadStory('Marketing Consent', 'MarketingConsent')
      .matchImageSnapshot();
  });
});
