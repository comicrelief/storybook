describe('Stories', () => {
  test('Browser Support message > BrowserSupportMessage', () => {
    cy.loadStory('Browser Support message', 'BrowserSupportMessage')
      .matchImageSnapshot();
  });

  test('Checkbox Field > CheckboxField', () => {
    cy.loadStory('Checkbox Field', 'CheckboxField')
      .matchImageSnapshot();
  });

  test('Cookie Consent Message > CookieConsentMessage', () => {
    cy.loadStory('Cookie Consent Message', 'CookieConsentMessage')
      .matchImageSnapshot();
  });

  test('File Upload > File upload', () => {
    cy.loadStory('File Upload', 'File upload')
      .matchImageSnapshot();
  });

  test('Footer > Comic Relief', () => {
    cy.loadStory('Footer', 'Comic Relief')
      .matchImageSnapshot();
  });

  test('Footer > Sport Relief', () => {
    cy.loadStory('Footer', 'Sport Relief')
      .matchImageSnapshot();
  });

  test('Footer > Red Nose Day', () => {
    cy.loadStory('Footer', 'Red Nose Day')
      .matchImageSnapshot();
  });

  test('Grants Infographics > data visualisation', () => {
    cy.loadStory('Grants Infographics', 'data visualisation')
      .matchImageSnapshot();
  });

  test('Grants Near You > GrantsNearYou', () => {
    cy.loadStory('Grants Near You', 'GrantsNearYou')
      .matchImageSnapshot();
  });

  test('Input Field > Text Field', () => {
    cy.loadStory('Input Field', 'Text Field')
      .matchImageSnapshot();
  });

  test('Input Field > Number Field', () => {
    cy.loadStory('Input Field', 'Number Field')
      .matchImageSnapshot();
  });

  test('Input Field > Checkbox', () => {
    cy.loadStory('Input Field', 'Checkbox')
      .matchImageSnapshot();
  });

  test('Input Field > Email Field', () => {
    cy.loadStory('Input Field', 'Email Field')
      .matchImageSnapshot();
  });

  test('Input Field > Telephone Field', () => {
    cy.loadStory('Input Field', 'Telephone Field')
      .matchImageSnapshot();
  });

  test('Input Field > Optional text Field with only required props', () => {
    cy.loadStory('Input Field', 'Optional text Field with only required props')
      .matchImageSnapshot();
  });

  test('Input Field > Text Field with inline button', () => {
    cy.loadStory('Input Field', 'Text Field with inline button')
      .matchImageSnapshot();
  });

  test('Input Field > Number Field with all props possible', () => {
    cy.loadStory('Input Field', 'Number Field with all props possible')
      .matchImageSnapshot();
  });

  test('Just In Time Message > JustInTime', () => {
    cy.loadStory('Just In Time Message', 'JustInTime')
      .matchImageSnapshot();
  });

  test('Marketing Consent > MarketingConsent', () => {
    cy.loadStory('Marketing Consent', 'MarketingConsent')
      .matchImageSnapshot();
  });

  test('Postcode Lookup > PostcodeLookup', () => {
    cy.loadStory('Postcode Lookup', 'PostcodeLookup')
      .matchImageSnapshot();
  });

  test('Radio Buttons > RadioButtons', () => {
    cy.loadStory('Radio Buttons', 'RadioButtons')
      .matchImageSnapshot();
  });

  test('Schools Lookup > nothing is selected', () => {
    cy.loadStory('Schools Lookup', 'nothing is selected')
      .matchImageSnapshot();
  });

  test('Schools Lookup > manual fields errors', () => {
    cy.loadStory('Schools Lookup', 'manual fields errors')
      .matchImageSnapshot();
  });

  test('Schools Lookup > manually entered school', () => {
    cy.loadStory('Schools Lookup', 'manually entered school')
      .matchImageSnapshot();
  });

  test('Schools Lookup > EDCO selected school', () => {
    cy.loadStory('Schools Lookup', 'EDCO selected school')
      .matchImageSnapshot();
  });

  test('Select Field > SelectField', () => {
    cy.loadStory('Select Field', 'SelectField')
      .matchImageSnapshot();
  });
});
