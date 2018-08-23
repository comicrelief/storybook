import React from 'react';
import { storiesOf } from '@storybook/react';

import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import RadioButtons from './RadioButtons';

const optionsArray1 = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2', selected : true },
  { label: 'Option 3', value: 'opt3' },
];

const optionsArray2 = [
  { label: 'Option 4', value: 'opt4' },
  { label: 'Option 5', value: 'opt5' },
  { label: 'Option 6', value: 'opt6' },
];

const optionsArray3 = [
  { label: 'Option 7', value: 'opt7' },
  { label: 'Option 8', value: 'opt8' },
  { label: 'Option 9', value: 'opt9' },
];

const id1 = text('id', 'radioButtons1');
const id2 = text('id', 'radioButtons2');
const id3 = text('id', 'radioButtons3');

const name1 = text('name', 'radiobuttons1');
const name2 = text('name', 'radiobuttons2');
const name3 = text('name', 'radiobuttons3');

const label1 = text('label', 'Radio Buttons - preselected');
const label2 = text('label', 'More Radio Buttons - not required');
const label3 = text('label', 'Yet More Radio Buttons');

const required = boolean('required', true);
const notRequired = boolean('required', false);

storiesOf('Radio buttons', module)
  .addDecorator(withKnobs)
  .add('Radio buttons',
    withInfo('Required')(() => {
      return (
        <div>
          <RadioButtons id={id1} name={name1} label={label1} required={required} options={optionsArray1} />
          <RadioButtons id={id2} name={name2} label={label2} required={notRequired} options={optionsArray2} />
          <RadioButtons id={id3} name={name3} label={label3} required={required} options={optionsArray3} />
        </div>
      );
    }),
  );
