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

storiesOf('SchoolsLookUp', module)
  .addDecorator(withKnobs)
  .add('Schools Look Up',
    withInfo('A schools address look up field')(() => {
      const min = number('Min Length', 3);
      const endpoint = text(
        'Endpoint',
        'https://bilw38ca93.execute-api.eu-west-1.amazonaws.com/production/schools/lookup?query=',
      );
      const establishmentNameValue = text(
        'Establishment name value',
        'xyz school',
      );
      const address1Value = text(
        'Address line 1 value',
        'ab street',
      );
      const address2Value = text(
        'Address line 2 value',
        'cd street',
      );
      const address3Value = text(
        'Address line 3 value',
        '',
      );
      const townValue = text(
        'Town value',
        'dummy town',
      );
      const postcodeValue = text(
        'Postcode value',
        'AB01 0A',
      );
      return (<SchoolsLookUp
        data={endpoint}
        min={min}
        onChange={() => {}}
        establishmentIdValue={123}
        establishmentNameValue={establishmentNameValue}
        address1Value={address1Value}
        address2Value={address2Value}
        address3Value={address3Value}
        townValue={townValue}
        postcodeValue={postcodeValue}
      />);
    }),
  );

storiesOf('Footer', module)
  .addDecorator(withKnobs)
  .add('Comic Relief',
    withInfo('comicrelief.com footer')(() => {
      const campaign = 'comicrelief';
      return (<Footer campaign={campaign} />);
    }),
  )
  .add('Sport Relief',
    withInfo('sportrelief.com footer')(() => {
      const campaign = 'sportrelief';
      return (<Footer campaign={campaign} />);
    }),
  )
  .add('Red Nose Day',
    withInfo('rednoseday.com footer')(() => {
      const campaign = 'rednoseday';
      return (<Footer campaign={campaign} />);
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
