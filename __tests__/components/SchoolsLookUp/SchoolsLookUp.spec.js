import React from 'react';
import SchoolsLookUp from '../../../src/components/SchoolsLookUp/SchoolsLookUp';
import renderer from 'react-test-renderer';

describe('Addition', () => {
  it('knows that 2 and 2 make 4', () => {
    expect(2 + 2).toBe(4);
  });
});

test('SchoolsLookUp displays error message when no result is found', () => {
  const component = renderer.create(
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
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  console.log('sdsdsa');
  // // manually trigger the callback
  // tree.props.onMouseEnter();
  // // re-rendering
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();

  // // manually trigger the callback
  // tree.props.onMouseLeave();
  // // re-rendering
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
});
