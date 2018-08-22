import React from 'react';
import { storiesOf } from '@storybook/react';

import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import RadioButtons from './RadioButtons';

const optionsArray = [
  { label: 'opt1', value: 'opt1' },
  { label: 'opt2', value: 'opt2' },
  { label: 'opt3', value: 'opt3' },
];

storiesOf('Radio buttons', module)
  .addDecorator(withKnobs)
  .add('Radio buttons',
    withInfo('Required')(() => {
      const id = text('id', 'radioButtons');
      const name = text('name', 'radiobuttons');
      const label = text('label', 'It is the radio button label');
      const required = boolean('required', true);
      return (<RadioButtons id={id} name={name} label={label} required={required} options={optionsArray} />);
    }),
  );
