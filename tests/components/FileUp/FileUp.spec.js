import React from 'react';
import FileUp from '../../../src/components/FileUp/FileUp';

test('Should have a label and "click to upload" in it', () => {
  const maxFiles = 5;
  const maxSize = 2000000;
  const types = ['image/*, application/pdf'];

  const output = mount(<FileUp maxFiles={maxFiles} maxSize={maxSize} types={types} onChange={() => {}} />);
  expect(output.find('label').text()).toContain('click to upload');
});
