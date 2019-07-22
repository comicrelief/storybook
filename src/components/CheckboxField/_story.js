import React from 'react';
import { storiesOf } from '@storybook/react';

import { withInfo } from '@storybook/addon-info';
import CheckboxField from './CheckboxField';

let type = 'checkbox';
let id = 'checkedfield';
let name = 'checkedfield';
let label = 'Checkbox'
let value = 1;
let additionalText = '* By ticking I state I am a UK taxpayer making a personal donation and understand that if I pay less Income Tax and/or Capital Gains Tax than the amount of Gift Aid claimed on all my donations, it is my responsibility to pay any difference. <a href="https://www.comicrelief.com/frequently-asked-questions" class="link inline" target="_blank">Find out more</a>';

storiesOf('Checkbox Field', module)
  .add('CheckboxField',
    withInfo('Checkbox')(() => {
      return (<CheckboxField 
                name={name}
                id={id}
                type={type}
                value={value}
                label={label}
                additionalText={additionalText}
            /> 
      );
    }),
  );
