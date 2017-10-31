import React from 'react';
import { storiesOf } from '@storybook/react';
import { specs, describe, it } from 'storybook-addon-specifications';

import { mount } from 'enzyme';
import expect from 'expect';

import { withKnobs, text, number } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import Footer from '../components/Footer/Footer';
import SchoolsLookUp from '../components/SchoolsLookUp/SchoolsLookUp';
import FileUp from '../components/FileUp/FileUp';
import GrantsNearYou from '../components/GrantsNearYou/GrantsNearYou';


storiesOf('Welcome', module).add('to Storybook', () => <h1>Welcome to CR Storybook</h1>);

const min = number('Min Length', 3);
const endpoint = text(
  'Endpoint',
  'https://bilw38ca93.execute-api.eu-west-1.amazonaws.com/production/schools/lookup?query=',
);
let selectedEstablishment = {};
let establishmentIdValue = '';
let establishmentNameValue = '';
let address1Value = '';
let address2Value = '';
let address3Value = '';
let townValue = '';
let postcodeValue = '';
storiesOf('SchoolsLookUp', module)
  .addDecorator(withKnobs)
  .add('A schools address look up field with nothing selected',
    () => {
      // empty data as fields is loaded initially will display search field and non of the manual fields
      selectedEstablishment = {};
      establishmentNameValue = '';
      return (<SchoolsLookUp
        data={endpoint}
        min={min}
        onChange={() => {}}
        selectedEstablishment={selectedEstablishment}
        establishmentIdValue={establishmentIdValue}
        establishmentNameValue={establishmentNameValue}
        address1Value={address1Value}
        address2Value={address2Value}
        address3Value={address3Value}
        townValue={townValue}
        postcodeValue={postcodeValue}
      />);
    }
  )
  .add('A schools address look up field with manually entered school',
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
      return (<SchoolsLookUp
        data={endpoint}
        min={min}
        onChange={() => {}}
        establishmentIdValue={establishmentIdValue}
        establishmentNameValue={establishmentNameValue}
        address1Value={address1Value}
        address2Value={address2Value}
        address3Value={address3Value}
        townValue={townValue}
        postcodeValue={postcodeValue}
      />);
    }
  )
  .add('A schools address look up field with selected school',
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
      return (<SchoolsLookUp
        data={endpoint}
        min={min}
        onChange={() => {}}
        selectedEstablishment={selectedEstablishment}
        establishmentIdValue={establishmentIdValue}
        establishmentIdValue={establishmentIdValue}
        establishmentNameValue={establishmentNameValue}
        address1Value={address1Value}
        address2Value={address2Value}
        address3Value={address3Value}
        townValue={townValue}
        postcodeValue={postcodeValue}
      />);
    }
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

storiesOf('GrantsNearYou', module)
  .add('GrantsNearYou',
    withInfo('doc string about my component')(() => {
      const SEARCH = 'https://1kfs7evxca.execute-api.eu-west-1.amazonaws.com/beta/grants-geo';
      const POSTCODE_API = 'https://api.postcodes.io';
      return (<GrantsNearYou searchURL={SEARCH} postcodeAPI={POSTCODE_API} />);
    }),
  );
