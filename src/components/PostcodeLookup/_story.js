import React from 'react';
import { storiesOf } from '@storybook/react';

import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import PostcodeLookup from './PostcodeLookup';


storiesOf('PostcodeLookup', module)
  .addDecorator(withKnobs)
  .add('Postcode lookup',
    withInfo('Required')(() => {
      const label = text('label', 'Postal address');
      const disableManualInput = boolean('forceManualInput', false);

      return (<PostcodeLookup label={label} forceManualInput={disableManualInput} isAddressValid={(validation) => console.log(validation) } />);
    }),
  );
