import React from 'react';
import { storiesOf } from '@storybook/react';

import { withKnobs, text, number, boolean } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import InputField from './InputField';

let id = '';
let type = '';
let name = '';
let label = '';
let required = false;
let defaultChecked = false;
let min = null;
let additionalText = null;

storiesOf('Input Field', module)
  .addDecorator(withKnobs)
  .add('Text Field',
    withInfo('Text input')(() => {
      id = text('id', 'textfield');
      type = text('type', 'text');
      name = text('name', 'textfield');
      label = text('label', 'Text field');
      required = boolean('required', true);
      return (<InputField id={id} type={type} name={name} label={label} required={required} />);
    }),
  )
  .add('Number Field',
    withInfo('Number input')(() => {
      id = text('id', 'numberfield');
      type = text('type', 'number');
      name = text('name', 'numberfield');
      label = text('label', 'Number field');
      required = boolean('required', true);
      min = number('min', 1);
      return (<InputField id={id} type={type} name={name} label={label} required={required} min={min} />);
    }),
  )
  .add('Checkbox',
    withInfo('Checkbox')(() => {
      id = text('id', 'checkbox');
      type = text('type', 'checkbox');
      name = text('name', 'checkbox');
      label = text('label', 'Checkbox');
      required = boolean('required', true);
      defaultChecked = boolean('defaultChecked', true);
      return (<InputField id={id} type={type} name={name} label={label} required={required} defaultChecked={defaultChecked} />);
    }),
  )
  .add('Email Field',
    withInfo('Email field')(() => {
      id = text('id', 'email');
      type = text('type', 'email');
      name = text('name', 'email');
      label = text('label', 'Email field');
      required = boolean('required', true);
      return (<InputField id={id} type={type} name={name} label={label} required={required} />);
    }),
  )
  .add('Telephone Field',
    withInfo('Telephone field')(() => {
      id = text('id', 'telephone');
      type = text('type', 'tel');
      name = text('name', 'telephone');
      label = text('label', 'Telephone field');
      required = boolean('required', true);
      return (<InputField id={id} type={type} name={name} label={label} required={required} />);
    }),
  )
  .add('Optional text Field with only required props',
    withInfo('Text field with all ')(() => {
      id= text('id', 'optional-text-required-options');
      type = text('type', 'text');
      name = text('name', 'textfield');
      label = text('label', 'Optional text field with only required props');
      return (<InputField id={id} type={type} name={name} label={label} required={required} />);
    }),
  )
  .add('Text Field with inline button',
    withInfo('Text field with all ')(() => {
      id= text('id', 'textfield-with-button');
      type = text('type', 'text');
      name = text('name', 'textfieldBtn');
      label = text('label', 'Text field with inline button');
      const buttonValue=text('buttonValue', 'CLICK ME');
      return (<InputField
        id={id}
        type={type}
        name={name}
        label={label}
        required={required}
        inlineButton
        buttonValue={buttonValue}
        buttonClick={() => Promise.resolve({valid: true, message: 'result of your click'}).then(alert('check the state!'))}
        isValid={(valid, name, value) => console.log('valid = ' , valid, ' name = ', name, ' value = ', value) }
        additionalText='Button click will set the state of the child with validation and message info from parent. Use cases: API calls returning messages e.g. postcode lookup and email sign up'
      />);
    }),
  )

  .add('Checbox with additional text',
    withInfo('additonal Text ')(() => {
      id = text('id', 'checkbox');
      type = text('type', 'checkbox');
      name = text('name', 'checkbox');
      label = text('label', 'Checkbox');
      required = boolean('required', true);
      additionalText = '* By ticking I state I am a UK taxpayer making a personal donation and understand that if I pay less Income Tax and/or Capital Gains Tax than the amount of Gift Aid claimed on all my donations, it is my responsibility to pay any difference. <a href="https://www.comicrelief.com/frequently-asked-questions" class="link inline" target="_blank">Find out more</a>';
      return (<InputField id={id} type={type} name={name} label={label} required={required} additionalText={additionalText} />);
    }),
  )
  .add('Number Field with all props possible',
    withInfo('Text field with all ')(() => {
      id = text('id', 'number-all-props');
      type = text('type', 'number');
      name = text('name', 'numberfield');
      label = text('label', 'Number Field with all props possible');
      required = boolean('required', true);
      const pattern = text('pattern', '^((?!13)[0-9]*)$');
      const placeholder = text('placeholder', '2');
      min = number('min', 2);
      const max = number('max', 20);
      defaultChecked = boolean('checked', false);
      const extraClass = text('extraClass', 'extra');
      const helpText = text('helpText', '13 is not allowed');
      const emptyFieldErrorText = text('emptyFieldErrorText', 'Aren\'t you forgetting something?');
      const invalidErrorText = text('invalidErrorText', 'Only numbers between 2 and 20 but not 13 please');
      additionalText = 'Some extra text explaining what this is for.'
      return (<InputField
        id={id}
        type={type}
        name={name}
        label={label}
        required={required}
        pattern={pattern}
        placeholder={placeholder}
        min={min}
        max={max}
        defaultChecked={defaultChecked}
        extraClass={extraClass}
        helpText={helpText}
        emptyFieldErrorText={emptyFieldErrorText}
        invalidErrorText={invalidErrorText}
        additionalText={additionalText}
      />);
    }),
  );
