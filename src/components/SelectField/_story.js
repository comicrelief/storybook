import React from 'react';
import { storiesOf } from '@storybook/react';

import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import SelectField from './SelectField';

const optionsArray = [
  { label: 'Please select' },
  { label: 'item 1', value: 'itemone' },
  { label: '----------', disabled: true },
  { label: 'item 2', value: 'itemtwo', selected: true },
  { label: 'item 3', value: 'itemthree' },
];

storiesOf('Select Field', module)
  .addDecorator(withKnobs)
  .add('Select Field',
    withInfo('Required')(() => {
      id = text('id', 'selectField');
      name = text('name', 'selectfield');
      label = text('label', 'Select field');
      required = boolean('required', true);
      return (<SelectField id={id} name={name} label={label} required={required} options={optionsArray} />);
    }),
  );
