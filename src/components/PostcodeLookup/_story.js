import React from 'react';
import { storiesOf } from '@storybook/react';

import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import PostcodeLookup from './PostcodeLookup';
import { postcodeValidationOverrideTest } from './postcodePatterns';


storiesOf('Postcode Lookup', module)
  .addDecorator(withKnobs)
  .add('PostcodeLookup',
    withInfo('Required')(() => {
      const label = text('label', 'Postal address');
      const disableManualInput = boolean('forceManualInput', false);

      return (<PostcodeLookup label={label} forceManualInput={disableManualInput} isAddressValid={(validation) => console.log('') } />);
    }),
  )
  .add('PostcodeLookup with postcode pattern override',
  withInfo('Required')(() => {
    const label = text('label', 'Postal address');
    const disableManualInput = boolean('forceManualInput', false);

    return (<PostcodeLookup postcodeValidation={postcodeValidationOverrideTest} label={label} forceManualInput={disableManualInput} isAddressValid={(validation) => console.log('') } />);
  }),
);
