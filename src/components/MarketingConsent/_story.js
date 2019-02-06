import React from 'react';
import { storiesOf } from '@storybook/react';

import { withKnobs } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import MarketingConsent from './MarketingConsent';
import FormData  from './FormData.json';

const fieldValidationFromParent = {
  email: {
    isFieldsHidden: false,
    checkedState: 'yes',
    fieldValidation: {
      email: {
        valid: true,
        value: 'test@test.bla',
        message: '',
        showErrorMessage: false,
      },
    },
  },
  post: {
    isFieldsHidden: false,
    checkedState: 'yes',
    fieldValidation: {
      address1: {
        valid: true,
        value: 'blastreet',
        message: '',
        showErrorMessage: false,
      },
      address2: {
        valid: '',
        value: '',
        message: '',
        showErrorMessage: false,
      },
      address3: {
        valid: '',
        value: '',
        message: '',
        showErrorMessage: false,
      },
      postcode: {
        valid: true,
        value: 'SW17TP',
        message: '',
        showErrorMessage: false,
      },
      town: {
        valid: true,
        value: 'bla town',
        message: '',
        showErrorMessage: false,
      },
      country: {
        valid: true,
        value: 'GB',
        message: '',
        showErrorMessage: false,
      },
    },
  },
  phone: {
    isFieldsHidden: false,
    checkedState: 'yes',
    fieldValidation: {
      phone: {
        valid: true,
        value: '07921212121',
        message: '',
        showErrorMessage: false,
      },
    },
  },
  SMS: {
    isFieldsHidden: false,
    checkedState: 'yes',
    fieldValidation: {
      mobile: {
        valid: true,
        value: '07921212121',
        message: '',
        showErrorMessage: false,
      },
    },
  },
};


storiesOf('MarketingConsent', module)
  .addDecorator(withKnobs)
  .add('Marketing consent',
    withInfo('Required')(() => {

      return (
        <MarketingConsent
          itemData={FormData}
          getValidation={(validation) => { console.log('getInputValidation: ', validation)}}
          // valueFromParent={fieldValidationFromParent}
        />
      );
  }));
