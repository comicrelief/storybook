import React from 'react';
import { storiesOf } from '@storybook/react';

import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import SelectField from './SelectField';

const optionsArray = [
  { label: 'Please select', selected: true},
  { label: 'item 1', value: 'itemone' },
  { label: '----------', disabled: true },
  { label: 'item 2', value: 'itemtwo' },
  { label: 'item 3', value: 'itemthree' },
];

storiesOf('Select Field', module)
  .addDecorator(withKnobs)
  .add('Select Field',
    withInfo('Required')(() => {
      const id = text('id', 'selectField');
      const name = text('name', 'selectfield');
      const label = text('label', 'Select field');
      const required = boolean('required', true);
      return (<SelectField id={id} name={name} label={label} required={required} options={optionsArray} />);
    }),
  );
