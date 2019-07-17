describe('Cookie Consent Message', () => {
  it('should load default story', () => {
    cy.loadStory('Cookie Consent Message', 'CookieConsentMessage')
      .matchImageSnapshot();
  });
});
