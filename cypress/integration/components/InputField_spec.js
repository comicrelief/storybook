describe('Input Field', () => {
  it('should load Text Field story', () => {
    cy.loadStory('Input Field', 'Text Field')
      .matchImageSnapshot();
  });

  it('should load Number Field story', () => {
    cy.loadStory('Input Field', 'Number Field')
      .matchImageSnapshot();
  });

  it('should load Checkbox story', () => {
    cy.loadStory('Input Field', 'Checkbox')
      .matchImageSnapshot();
  });

  it('should load Email Field story', () => {
    cy.loadStory('Input Field', 'Email Field')
      .matchImageSnapshot();
  });

  it('should load Telephone Field story', () => {
    cy.loadStory('Input Field', 'Telephone Field')
      .matchImageSnapshot();
  });

  it('should load Optional text Field with only required props story', () => {
    cy.loadStory('Input Field', 'Optional text Field with only required props')
      .matchImageSnapshot();
  });

  it('should load Text Field with inline button story', () => {
    cy.loadStory('Input Field', 'Text Field with inline button')
      .matchImageSnapshot();
  });

  it('should load Number Field with all props possible story', () => {
    cy.loadStory('Input Field', 'Number Field with all props possible')
      .matchImageSnapshot();
  });
});
