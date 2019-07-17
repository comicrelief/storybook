describe('Schools Lookup', () => {
  it('should load nothing is selected story', () => {
    cy.loadStory('Schools Lookup', 'nothing is selected', 1000, 'SchoolsLookUp')
      .matchImageSnapshot();
  });

  it('should load manual fields errors story', () => {
    cy.loadStory('Schools Lookup', 'manual fields errors', 1000, 'SchoolsLookUp')
      .matchImageSnapshot();
  });

  it('should load manually entered school story', () => {
    cy.loadStory('Schools Lookup', 'manually entered school', 1000, 'SchoolsLookUp')
      .matchImageSnapshot();
  });

  it('should load EDCO selected school story', () => {
    cy.loadStory('Schools Lookup', 'EDCO selected school', 1000, 'SchoolsLookUp')
      .matchImageSnapshot();
  });
});
