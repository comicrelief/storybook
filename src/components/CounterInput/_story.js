import React from 'react';
import { storiesOf } from '@storybook/react';

import {withKnobs, text, boolean, number} from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';

import CounterInput from './CounterInput';


let id = '';
let name = '';
let label = '';
let required = false;
let defaultChecked = false;
let min = null;
let max = null;
let leftButton = '-';
let rightButton = '+';
let additionalText = null;
let value = 0;

storiesOf('Counter Input', module)
  .addDecorator(withKnobs)
  .add('Text Field',
    withInfo('Text input')(() => {
      id = text('id', 'counter-input');
      name = text('name', 'counter-input');
      label = text('label', 'Counter Input');
      required = boolean('required', true);
      min = number('min', 1);
      const max = number('max', 20);
      return (<CounterInput
        id={id}
        name={name}
        label={label}
        required={required}
        min={min}
        max={max}
        leftButton={leftButton}
        rightButton={rightButton}
        additionalText={additionalText}
        value={value ? value : 1}
      />);
    }),
  );
