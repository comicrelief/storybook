import axios from 'axios';
import React from 'react';
import { shallow, render } from 'enzyme';
import sinon from 'sinon';
import SchoolsLookUp from '../../../src/components/SchoolsLookUp/SchoolsLookUp';

let sandbox;

beforeAll(() => {
  sandbox = sinon.sandbox.create();
});

afterEach(() => {
  sandbox.restore();
});

test('search and recieve non-empty results', () => {
  const mockData = {
    data: {
      data: {
        schools: [
          {
            id: 1,
            name: 'School 1',
            address_1: 'address 1',
            town: 'town 1',
            post_code: 'postcode 1',
          },
          {
            id: 2,
            name: 'School 2',
            address_1: 'address 2',
            town: 'town 2',
            post_code: 'postcode 2',
          },
          {
            id: 3,
            name: 'School 3',
            address_1: 'address 3',
            town: 'town 3',
            post_code: 'postcode 3',
          },
        ],
      },
    },
  };
  const promise = Promise.resolve(mockData);
  // mock all get requests to return mocked promise above
  sandbox.stub(axios, 'get').callsFake(() => promise);

  const component = shallow(
    <SchoolsLookUp
      data="/lookup?query="
      min={0}
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

  // assert spinner is not displayed
  expect(component.find('[name="spinner"]').exists()).toBe(false);
  // find the search box
  const searchBox = component.find('[type="text"]');
  // trigger search
  searchBox.simulate('search', 'testquery');

  // assert spinner is displayed
  expect(component.find('[name="spinner"]').exists()).toBe(true);

  return promise.then(() => {
    // assert spinner is displayed
    expect(component.find('[name="spinner"]').exists()).toBe(false);
    const schools = mockData.data.data.schools;
    // assert results are recieved
    expect(component.state('options')).toEqual(schools);
    // render MenuHeader where default option is expected
    const instance = component.setState({ query: 'testquery' }).instance();
    const menuHeader = shallow(instance.renderMenu(schools, { text: 'test' })).find('MenuHeader').html();

    // assert default option is displayed
    expect(menuHeader).toContain('Please select a school from the list below');
    // assert default option is highlighted
    expect(menuHeader).toContain('default-selection');
  });
});

test('search and recieve empty results', () => {
  const mockData = {
    data: {
      data: {
        schools: [],
      },
    },
  };
  const promise = Promise.resolve(mockData);
  sandbox.stub(axios, 'get').callsFake(() => promise);

  const component = shallow(
    <SchoolsLookUp
      data="/lookup?query="
      min={0}
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

  // assert spinner is not displayed
  expect(component.find('[name="spinner"]').exists()).toBe(false);
  // find the search box
  const searchBox = component.find('[type="text"]');
  searchBox.simulate('search', 'testquery');

  // assert spinner is displayed
  expect(component.find('[name="spinner"]').exists()).toBe(true);

  return promise.then(() => {
    // assert spinner is displayed
    expect(component.find('[name="spinner"]').exists()).toBe(false);
    // assert no results are recieved
    expect(component.state('options')).toEqual([]);
    const emptyLabel = "Sorry, we can't find this. Please check your school or postcode is correct and manually add the address below.";

    // assert no results message is displayed
    expect(component.text()).toContain(emptyLabel);
  });
});

test('clicking "enter manually" should display manual fields', () => {
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

test('clicking "edit" should display search field and manual fields', () => {
  const component = shallow(
    <SchoolsLookUp
      data=""
      min={2}
      onChange={() => {}}
      selectedEstablishment={{
        id: 123,
        name: 'School xyz',
        address_1: 'dummy address line 1',
        town: 'dummy town',
        post_code: 'dummy postcode',
      }}
      establishmentIdValue={123}
      establishmentNameValue="School xyz"
      address1Value="dummy address line 1"
      address2Value=""
      address3Value=""
      townValue="dummy town"
      postcodeValue="dummy postcode"
    />,
  );
  // assert fields are not displayed before 'edit' is clicked
  expect(component.find('.schoolsLookUp-search').exists()).toBe(false);
  expect(component.find('#establishmentName').exists()).toBe(false);
  expect(component.find('#address1').exists()).toBe(false);
  expect(component.find('#address2').exists()).toBe(false);
  expect(component.find('#address3').exists()).toBe(false);
  expect(component.find('#town').exists()).toBe(false);
  expect(component.find('#postcode').exists()).toBe(false);

  component.find('button[name="edit"]').simulate('click');

  // assert fields are displayed after 'edit' is clicked
  expect(component.find('.schoolsLookUp-search').exists()).toBe(true);
  expect(component.find('#establishmentName').exists()).toBe(true);
  expect(component.find('#establishmentName').prop('value')).toEqual('School xyz');
  expect(component.find('#address1').exists()).toBe(true);
  expect(component.find('#address1').prop('value')).toEqual('dummy address line 1');
  expect(component.find('#address2').exists()).toBe(true);
  expect(component.find('#address2').prop('value')).toEqual('');
  expect(component.find('#address3').exists()).toBe(true);
  expect(component.find('#address3').prop('value')).toEqual('');
  expect(component.find('#town').exists()).toBe(true);
  expect(component.find('#town').prop('value')).toEqual('dummy town');
  expect(component.find('#postcode').exists()).toBe(true);
  expect(component.find('#postcode').prop('value')).toEqual('dummy postcode');
});

test('inserting manually should clear selected school', () => {
  const onChange = sinon.spy();
  const component = shallow(
    <SchoolsLookUp
      data=""
      min={2}
      onChange={onChange}
      selectedEstablishment={{
        id: 123,
        name: 'School xyz',
        address_1: 'dummy address line 1',
        town: 'dummy town',
        post_code: 'dummy postcode',
      }}
      selectedEstablishmentIdentifier="selectedSchool"
      establishmentIdValue={123}
      establishmentIdIdentifier="schoolId"
      establishmentNameValue="School xyz"
      establishmentNameIdentifier="schoolName"
      address1Value="dummy address line 1"
      address1Identifier="schoolAddress1"
      address2Value=""
      address2Identifier="schoolAddress2"
      address3Value=""
      address3Identifier="schoolAddress3"
      townValue="dummy town"
      townIdentifier="schoolTown"
      postcodeValue="dummy postcode"
      postcodeIdentifier="schoolPostcode"
    />,
  );

  component.find('button[name="edit"]').simulate('click');

  // assert fields with custom ids exist
  expect(component.find('#schoolName').exists()).toBe(true);
  expect(component.find('#schoolAddress1').exists()).toBe(true);
  expect(component.find('#schoolAddress2').exists()).toBe(true);
  expect(component.find('#schoolAddress3').exists()).toBe(true);
  expect(component.find('#schoolTown').exists()).toBe(true);
  expect(component.find('#schoolPostcode').exists()).toBe(true);

  // edit all fields manually
  component.find('#schoolName').simulate('change', { target: { value: 'another school xyz' } });
  component.find('#schoolAddress1').simulate('change', { target: { value: 'another dummy address line 1' } });
  component.find('#schoolAddress2').simulate('change', { target: { value: 'another dummy address line 2' } });
  component.find('#schoolAddress3').simulate('change', { target: { value: 'another dummy address line 3' } });
  component.find('#schoolTown').simulate('change', { target: { value: 'another dummy town' } });
  component.find('#schoolPostcode').simulate('change', { target: { value: 'another dummy postcode' } });

  // assert all fields are edited and selected school is cleared
  expect(onChange.calledWith('selectedSchool', { target: { value: {} } })).toBe(true);
  expect(onChange.calledWith('schoolId', { target: { value: '' } })).toBe(true);
  expect(onChange.calledWith('schoolName', { target: { value: 'another school xyz' } })).toBe(true);
  expect(onChange.calledWith('schoolAddress1', { target: { value: 'another dummy address line 1' } })).toBe(true);
  expect(onChange.calledWith('schoolAddress2', { target: { value: 'another dummy address line 2' } })).toBe(true);
  expect(onChange.calledWith('schoolAddress3', { target: { value: 'another dummy address line 3' } })).toBe(true);
  expect(onChange.calledWith('schoolTown', { target: { value: 'another dummy town' } })).toBe(true);
  expect(onChange.calledWith('schoolPostcode', { target: { value: 'another dummy postcode' } })).toBe(true);
});

test('validation should be triggered on blur', () => {
  const validateField = sinon.spy();
  const component = shallow(
    <SchoolsLookUp
      data=""
      min={2}
      onChange={() => {}}
      validateField={validateField}
      selectedEstablishment={{}}
      establishmentIdValue=""
      establishmentNameValue="School xyz"
      address1Value="dummy address line 1"
      address2Value=""
      address3Value=""
      townValue="dummy town"
      postcodeValue="dummy postcode"
    />,
  );

  // trigger blur on all fields and assert all fields are validated
  component.find('#establishmentName').simulate('blur');
  expect(validateField.calledWith('establishmentName')).toBe(true);

  component.find('#address1').simulate('blur');
  expect(validateField.calledWith('address1')).toBe(true);

  component.find('#address2').simulate('blur');
  expect(validateField.calledWith('address2')).toBe(true);

  component.find('#address3').simulate('blur');
  expect(validateField.calledWith('address3')).toBe(true);

  component.find('#town').simulate('blur');
  expect(validateField.calledWith('town')).toBe(true);

  component.find('#postcode').simulate('blur');
  expect(validateField.calledWith('postcode')).toBe(true);
});
