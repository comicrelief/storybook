import React from 'react';
import { storiesOf } from '@storybook/react';

import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import MarketingConsent from './MarketingConsent';
import FormData  from './FormData.json';



storiesOf('MarketingConsent', module)
  .addDecorator(withKnobs)
  .add('Marketing consent',
    withInfo('Required')(() => {

      return getFormFields();
  }));

function getFormFields() {
    return FormData.Questions.map((item) =>
      <MarketingConsent key={item.id} getCheckboxValue={(text, event) => { console.log('event: ', event, 'text:', text);}} getFieldInputValidation={(validation) => { console.log('validation: ', validation) }} itemData={item} /> );
}
