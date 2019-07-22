import React from 'react';
import { storiesOf } from '@storybook/react';

import { withKnobs } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import MarketingConsent from './MarketingConsent';
import FormData  from './FormData.json';

const fieldValidationFromParent = {
  emailConsent: {
    isFieldsHidden: false,
    value: 'yes',
    valid: true,
    fieldValidation: {
      email: {
        valid: true,
        value: 'test@test.bla',
        message: '',
        showErrorMessage: false,
      },
    },
  },
  postConsent: {
    isFieldsHidden: false,
    value: 'yes',
    valid: true,
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
  phoneConsent: {
    isFieldsHidden: false,
    value: 'yes',
    valid: true,
    fieldValidation: {
      phone: {
        valid: true,
        value: '07921212121',
        message: '',
        showErrorMessage: false,
      },
    },
  },
  SMSConsent: {
    isFieldsHidden: false,
    value: 'yes',
    valid: true,
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


storiesOf('Marketing Consent', module)
  .addDecorator(withKnobs)
  .add('MarketingConsent',
    withInfo('Required')(() => {

      return (
        <MarketingConsent
          itemData={FormData}
          getValidation={(validation) => { console.log('getInputValidation: ', validation)}}
          // valueFromParent={fieldValidationFromParent}
        />
      );
  }));
