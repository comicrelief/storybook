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

// const fieldValidationFromParent = {
//   email: {
//     valid: true,
//     value: 'test@test.bla',
//     message: '',
//     showErrorMessage: false,
//   },
//   address1:
//     {
//       valid: true,
//       value: 'test@test.bla',
//       message: '',
//       showErrorMessage: false,
//     },
// };

function getFormFields() {
  return FormData.Questions.map((item) =>
    <MarketingConsent
      key={item.id}
      getCheckboxState={(text, event) => { console.log('checkbox:', text, 'checkboxValue: ', event);}}
      getFieldInputValidation={(validation) => { console.log('getInputValidation: ', validation) }}
      itemData={item}
      // valueFromParent={fieldValidationFromParent}
    /> );
}
