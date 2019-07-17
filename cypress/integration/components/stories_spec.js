describe('Stories', () => {
  it('Browser Support message > BrowserSupportMessage', () => {
    // wait a bit on first load
    cy.loadStory('Browser Support message', 'BrowserSupportMessage', 4000)
      .matchImageSnapshot();
  });

  it('Checkbox Field > CheckboxField', () => {
    cy.loadStory('Checkbox Field', 'CheckboxField')
      .matchImageSnapshot();
  });

  it('Cookie Consent Message > CookieConsentMessage', () => {
    cy.loadStory('Cookie Consent Message', 'CookieConsentMessage')
      .matchImageSnapshot();
  });

  it('File Upload > File upload', () => {
    cy.loadStory('File Upload', 'File upload')
      .matchImageSnapshot();
  });

  it('Footer > Comic Relief', () => {
    cy.loadStory('Footer', 'Comic Relief', 3000)
      .matchImageSnapshot();
  });

  it('Footer > Sport Relief', () => {
    cy.loadStory('Footer', 'Sport Relief', 3000)
      .matchImageSnapshot();
  });

  it('Footer > Red Nose Day', () => {
    cy.loadStory('Footer', 'Red Nose Day', 3000)
      .matchImageSnapshot();
  });

  it('Grants Infographics > data visualisation', () => {
    cy.loadStory('Grants Infographics', 'data visualisation')
      .matchImageSnapshot();
  });

  it('Grants Near You > GrantsNearYou', () => {
    cy.loadStory('Grants Near You', 'GrantsNearYou')
      .matchImageSnapshot();
  });

  it('Input Field > Text Field', () => {
    cy.loadStory('Input Field', 'Text Field')
      .matchImageSnapshot();
  });

  it('Input Field > Number Field', () => {
    cy.loadStory('Input Field', 'Number Field')
      .matchImageSnapshot();
  });

  it('Input Field > Checkbox', () => {
    cy.loadStory('Input Field', 'Checkbox')
      .matchImageSnapshot();
  });

  it('Input Field > Email Field', () => {
    cy.loadStory('Input Field', 'Email Field')
      .matchImageSnapshot();
  });

  it('Input Field > Telephone Field', () => {
    cy.loadStory('Input Field', 'Telephone Field')
      .matchImageSnapshot();
  });

  it('Input Field > Optional text Field with only required props', () => {
    cy.loadStory('Input Field', 'Optional text Field with only required props')
      .matchImageSnapshot();
  });

  it('Input Field > Text Field with inline button', () => {
    cy.loadStory('Input Field', 'Text Field with inline button')
      .matchImageSnapshot();
  });

  it('Input Field > Number Field with all props possible', () => {
    cy.loadStory('Input Field', 'Number Field with all props possible')
      .matchImageSnapshot();
  });

  it('Just In Time Message > JustInTime', () => {
    cy.loadStory('Just In Time Message', 'JustInTime')
      .matchImageSnapshot();
  });

  it('Marketing Consent > MarketingConsent', () => {
    cy.loadStory('Marketing Consent', 'MarketingConsent')
      .matchImageSnapshot();
  });

  it('Postcode Lookup > PostcodeLookup', () => {
    cy.loadStory('Postcode Lookup', 'PostcodeLookup')
      .matchImageSnapshot();
  });

  it('Radio Buttons > RadioButtons', () => {
    cy.loadStory('Radio Buttons', 'RadioButtons')
      .matchImageSnapshot();
  });

  it('Schools Lookup > nothing is selected', () => {
    cy.loadStory('Schools Lookup', 'nothing is selected', 1000, 'SchoolsLookUp')
      .matchImageSnapshot();
  });

  it('Schools Lookup > manual fields errors', () => {
    cy.loadStory('Schools Lookup', 'manual fields errors', 1000, 'SchoolsLookUp')
      .matchImageSnapshot();
  });

  it('Schools Lookup > manually entered school', () => {
    cy.loadStory('Schools Lookup', 'manually entered school', 1000, 'SchoolsLookUp')
      .matchImageSnapshot();
  });

  it('Schools Lookup > EDCO selected school', () => {
    cy.loadStory('Schools Lookup', 'EDCO selected school', 1000, 'SchoolsLookUp')
      .matchImageSnapshot();
  });

  it('Select Field > SelectField', () => {
    cy.loadStory('Select Field', 'SelectField')
      .matchImageSnapshot();
  });
});
