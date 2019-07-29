

describe('Schools Lookup', () => {
  it('should load nothing is selected story', () => {
    cy.loadStory('Schools Lookup', 'nothing is selected', 10000, 'SchoolsLookUp')
      .matchImageSnapshot();
  });

  it('should load manual fields errors story', () => {
    cy.loadStory('Schools Lookup', 'manual fields errors', 10000, 'SchoolsLookUp')
      .matchImageSnapshot();
  });

  it('should load manually entered school story', () => {
    cy.loadStory('Schools Lookup', 'manually entered school', 10000, 'SchoolsLookUp')
      .matchImageSnapshot();
  });

  it('should load EDCO selected school story', () => {
    cy.loadStory('Schools Lookup', 'EDCO selected school', 10000, 'SchoolsLookUp')
      .matchImageSnapshot();
  });

  it('should load results', () => {
    cy.loadStory('Schools Lookup', 'nothing is selected', 10000, 'SchoolsLookUp')
      .findByCustomId('school_lookup_input')
      .type('SE1')
      .wait(5000)
      .parents('[data-test-id=SchoolsLookUp]')
      .matchImageSnapshot();
  });
});
