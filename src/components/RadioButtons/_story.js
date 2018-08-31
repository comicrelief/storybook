import React from 'react';
import { storiesOf } from '@storybook/react';

import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import RadioButtons from './RadioButtons';

const optionsArray1 = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
  { label: 'Option 3', value: 'opt3' },
];

const optionsArray2 = [
  { label: 'Option 4', value: 'opt4' },
  { label: 'Option 5', value: 'opt5' },
  { label: 'Option 6', value: 'opt6' },
];

const optionsArray3 = [
  { label: 'Option 7', value: 'opt7' },
  { label: 'Option 8', value: 'opt8', selected : true },
  { label: 'Option 9', value: 'opt9' },
];

const optionsArray4 = [
  { label: 'Option 10', value: 'opt10' },
  { label: 'Option 11', value: 'opt11', selected : true,
    additionalText: "Here's some additional text with a [link](http://example.com), " +
  "and some lorem ipsum: Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. " +
  "Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus." },
  { label: 'Option 12', value: 'opt12' },
];

const id1 = text('id', 'radioButtons1');
const id2 = text('id', 'radioButtons2');
const id3 = text('id', 'radioButtons3');
const id4 = text('id', 'radioButtons4');

const name1 = text('name', 'radiobuttons1');
const name2 = text('name', 'radiobuttons2');
const name3 = text('name', 'radiobuttons3');
const name4 = text('name', 'radiobuttons4');

const label1 = text('label', 'Radio Buttons: required');
const label2 = text('label', 'Radio Buttons: not required');
const label3 = text('label', 'Radio Buttons: required, preselected');
const label4 = text('label', 'Radio Buttons: not required, preselected');

const required = boolean('required', true);
const notRequired = boolean('required', false);

storiesOf('Radio buttons', module)
  .addDecorator(withKnobs)
  .add('Radio buttons',
    withInfo('Required')(() => {
      return (
        <div>
          <RadioButtons
            id={id1}
            name={name1}
            label={label1}
            required={required}
            options={optionsArray1}
            showErrorMessage={notRequired}
          />
          <RadioButtons
            id={id2}
            name={name2}
            label={label2}
            required={notRequired}
            options={optionsArray2}
            showErrorMessage={notRequired}
          />
          <RadioButtons
            id={id3}
            name={name3}
            label={label3}
            required={required}
            options={optionsArray3}
            showErrorMessage={notRequired}
          />
          <RadioButtons
            id={id4}
            name={name4}
            label={label4}
            required={notRequired}
            options={optionsArray4}
            showErrorMessage={notRequired}
          />
        </div>
      );
    }),
  );
