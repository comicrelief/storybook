import React from 'react';
import { storiesOf } from '@storybook/react';
import { specs, describe, it } from 'storybook-addon-specifications';

import { mount } from 'enzyme';
import expect from 'expect';

import { withKnobs, text, number, object } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import Footer from '../components/Footer/Footer';
import InputField from '../components/InputField/InputField';
import SchoolsLookUpContainer from '../components/SchoolsLookUp/SchoolsLookUpContainer';
import FileUp from '../components/FileUp/FileUp';
import GrantsNearYou from '../components/GrantsNearYou/GrantsNearYou';
import GrantsInfographics from '../components/GrantsInfographics/GrantsInfographics';

storiesOf('Welcome', module).add('to Storybook', () => <h1>Welcome to CR Storybook</h1>);

const min = number('Min Length', 3);
const endpoint = text(
  'Endpoint',
  'https://bilw38ca93.execute-api.eu-west-1.amazonaws.com/production/schools/lookup?query=',
);
const address2Value = '';
const address3Value = '';
let selectedEstablishment = {};
let establishmentIdValue = '';
let establishmentNameValue = '';
let address1Value = '';
let townValue = '';
let postcodeValue = '';
storiesOf('SchoolsLookUp', module)
  .addDecorator(withKnobs)
  .add('nothing is selected',
    () => {
      // empty data as fields is loaded initially will display search field and non of the manual fields
      selectedEstablishment = {};
      establishmentNameValue = '';
      return (<SchoolsLookUpContainer
        data={endpoint}
        min={min}
        selectedEstablishment={selectedEstablishment}
        establishmentIdValue={establishmentIdValue}
        establishmentNameValue={establishmentNameValue}
        address1Value={address1Value}
        address2Value={address2Value}
        address3Value={address3Value}
        townValue={townValue}
        postcodeValue={postcodeValue}
      />);
    },
  )
  .add('manual fields errors',
    () => {
      // empty data as fields is loaded initially will display search field and non of the manual fields
      selectedEstablishment = {};
      establishmentNameValue = '';
      return (<SchoolsLookUpContainer
        data={endpoint}
        min={min}
        selectedEstablishment={selectedEstablishment}
        establishmentIdValue={establishmentIdValue}
        establishmentNameValue={establishmentNameValue}
        address1Value={address1Value}
        address2Value={address2Value}
        address3Value={address3Value}
        townValue={townValue}
        postcodeValue={postcodeValue}
        establishmentNameErrorMessage="establishmentName error message"
        address1ErrorMessage="address1 error message"
        address2ErrorMessage="address2 error message"
        address3ErrorMessage="address3 error message"
        townErrorMessage="town error message"
        postcodeErrorMessage="postcode error message"
      />);
    },
  )
  .add('manually entered school',
    () => {
      // we are relying on selectedEstablishment prop to decide
      // whether school is selected from lookup or entered manually
      // here as it is just an empty object while other props are not empty
      // manual fields will be displayed
      selectedEstablishment = {};
      establishmentNameValue = 'School xyz';
      address1Value = 'dummy address line 1';
      townValue = 'dummy town';
      postcodeValue = 'dummy postcode';
      return (<SchoolsLookUpContainer
        data={endpoint}
        min={min}
        establishmentIdValue={establishmentIdValue}
        establishmentNameValue={establishmentNameValue}
        address1Value={address1Value}
        address2Value={address2Value}
        address3Value={address3Value}
        townValue={townValue}
        postcodeValue={postcodeValue}
      />);
    },
  )
  .add('EDCO selected school',
    () => {
      // we are relying on selectedEstablishment prop to decide
      // whether school is selected from lookup or entered manually
      // here as selectedEstablishment is a non-empty object
      // selected school data is displayed as non-editable
      selectedEstablishment = {
        id: 123,
        name: 'School xyz',
        address_1: 'dummy address line 1',
        town: 'dummy town',
        post_code: 'dummy postcode',
      };
      establishmentIdValue = 123;
      establishmentNameValue = 'School xyz';
      address1Value = 'dummy address line 1';
      townValue = 'dummy town';
      postcodeValue = 'dummy postcode';
      return (<SchoolsLookUpContainer
        data={endpoint}
        min={min}
        selectedEstablishment={selectedEstablishment}
        establishmentIdValue={establishmentIdValue}
        establishmentNameValue={establishmentNameValue}
        address1Value={address1Value}
        address2Value={address2Value}
        address3Value={address3Value}
        townValue={townValue}
        postcodeValue={postcodeValue}
      />);
    },
  );

storiesOf('Footer', module)
  .addDecorator(withKnobs)
  .add('Comic Relief',
    withInfo('comicrelief.com footer')(() => {
      const copy = text('Copy', 'copyright 2017');
      const source = 'https://www.comicrelief.com';
      const campaign = 'comicrelief';
      return (<Footer copy={copy} source={source} campaign={campaign} />);
    }),
  )
  .add('Sport Relief',
    withInfo('sportrelief.com footer')(() => {
      const copy = text('Copy', 'copyright 2018');
      const source = 'https://www.sportrelief.com';
      const campaign = 'sportrelief';
      return (<Footer copy={copy} source={source} campaign={campaign} />);
    }),
  )
  .add('Red Nose Day',
    withInfo('rednoseday.com footer')(() => {
      const copy = text('Copy', 'copyright 2018');
      const source = 'https://www.comicrelief.com'; // fallback to comicrelief.com
      const campaign = 'rednoseday';
      return (<Footer copy={copy} source={source} campaign={campaign} />);
    }),
  );
storiesOf('Input Field', module)
  .addDecorator(withKnobs)
  .add('Text Field',
    withInfo('Text input')(() => {
      const textField = object('field', {
        id: 'textfield',
        type: 'text',
        name: 'textfield',
        label: 'Text field',
        required: true,
      });
      return (<InputField field={textField} />);
    }),
  )
  .add('Number Field',
    withInfo('Number input')(() => {
      const numberField = object('field', {
        id: 'numberfield',
        type: 'number',
        name: 'numberfield',
        label: 'Number field',
        required: true,
        min: 1,
      });
      return (<InputField field={numberField} />);
    }),
  )
  .add('Checkbox',
    withInfo('Checkbox')(() => {
      const checkbox = object('field', {
        id: 'checkbox',
        type: 'checkbox',
        name: 'checkbox',
        label: 'Checkbox',
        required: true,

      });
      return (<InputField field={checkbox} />);
    }),
  )
  .add('Email Field',
    withInfo('Email field')(() => {
      const email = object('field', {
        id: 'email',
        type: 'email',
        name: 'email',
        label: 'Email field',
        required: true,
      });
      return (<InputField field={email} />);
    }),
  )
  .add('Telephone Field',
    withInfo('Telephone field')(() => {
      const tel = object('field', {
        id: 'telephone',
        type: 'tel',
        name: 'telephone',
        label: 'Telephone field',
        required: true,
      });
      return (<InputField field={tel} />);
    }),
  )
  .add('Optional text Field with only required props',
    withInfo('Text field with all ')(() => {
      const tel = object('field', {
        id: 'optional-text-required-options',
        type: 'text',
        name: 'text',
        label: 'Optional text field with only required props',
        required: false,
      });
      return (<InputField field={tel} />);
    }),
  )
  .add('Number Field with all props possible',
    withInfo('Text field with all ')(() => {
      const tel = object('field', {
        id: 'number-all-props',
        type: 'number',
        name: 'number',
        label: 'Number Field with all props possible',
        required: true,
        pattern: '^((?!13)[0-9]*)$',
        placeholder: 2,
        min: 2,
        max: 20,
        checked: false,
        extraClass: 'extra',
        helpText: '13 is not allowed',
        emptyFieldErrorText: 'Aren\'t you forgetting something?',
        invalidErrorText: 'Only numbers between 2 and 20 but not 13 please',
      });
      return (<InputField field={tel} />);
    }),
  );
storiesOf('File Upload', module)
  .addDecorator(withKnobs)
  .add('Single',
    withInfo('File upload')(() => {
      const maxFiles = number('Max Files', 5);
      const maxSize = number('Max Size', 2000000);
      const types = text('Types', 'image/*, application/pdf');
      const story = <FileUp maxFiles={maxFiles} maxSize={maxSize} types={types} />;

      specs(() => describe('File Upload', () => {
        it('Should have a label and "click to upload" in it', () => {
          const output = mount(story);
          expect(output.find('label').text()).toContain('click to upload');
        });
      }));

      return story;
    }),
  );

storiesOf('Grants Near You', module)
  .add('GrantsNearYou',
    withInfo('doc string about my component')(() => {
      const SEARCH = 'https://1kfs7evxca.execute-api.eu-west-1.amazonaws.com/beta/grants-geo';
      const POSTCODE_API = 'https://api.postcodes.io';
      return (<GrantsNearYou searchURL={SEARCH} postcodeAPI={POSTCODE_API} />);
    }),
  );

storiesOf('Grants Infographics', module)
  .add('data visualisation',
    withInfo('data visualisation with React-Vis from Grant API')(() => {
      const GRANTS_API = 'https://1kfs7evxca.execute-api.eu-west-1.amazonaws.com/beta/grants';
      return (<GrantsInfographics grantsAPI={GRANTS_API} />);
    }),
  );
