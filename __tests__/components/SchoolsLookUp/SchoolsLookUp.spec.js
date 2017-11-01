import React from 'react';
import { shallow } from 'enzyme';

import SchoolsLookUp from '../../../src/components/SchoolsLookUp/SchoolsLookUp';

// 'or enter manually' button is clicked
// search -> mock request when there are results and empty case
// default option is there highlighted till other option is moved over
// select school from results
// edit button is clicked
// insert manually with previously selected school
// validation is triggered on blur
test('selecting "enter manually" should display manual fields', () => {
  const component = shallow(
    <SchoolsLookUp
      data=""
      min={2}
      onChange={() => {}}
      establishmentIdValue=""
      establishmentNameValue=""
      address1Value=""
      address2Value=""
      address3Value=""
      townValue=""
      postcodeValue=""
    />,
  );
  // assert fields are not displayed before 'on enter manually' is clicked
  expect(component.find('#establishmentName').exists()).toBe(false);
  expect(component.find('#address1').exists()).toBe(false);
  expect(component.find('#address2').exists()).toBe(false);
  expect(component.find('#address3').exists()).toBe(false);
  expect(component.find('#town').exists()).toBe(false);
  expect(component.find('#postcode').exists()).toBe(false);

  component.find('button[name="enterManually"]').simulate('click');

  // assert fields are displayed after 'on enter manually' is clicked
  expect(component.find('#establishmentName').exists()).toBe(true);
  expect(component.find('#address1').exists()).toBe(true);
  expect(component.find('#address2').exists()).toBe(true);
  expect(component.find('#address3').exists()).toBe(true);
  expect(component.find('#town').exists()).toBe(true);
  expect(component.find('#postcode').exists()).toBe(true);
});
