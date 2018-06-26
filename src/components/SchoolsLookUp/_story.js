import React from 'react';
import { storiesOf } from '@storybook/react';

import { withKnobs, text, number } from '@storybook/addon-knobs';
import SchoolsLookUpContainer from './SchoolsLookUpContainer';

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