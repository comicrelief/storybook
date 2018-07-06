import React from 'react';
import { storiesOf } from '@storybook/react';

import { withKnobs, text } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import PostcodeLookup from './PostcodeLookup';


storiesOf('PostcodeLookup', module)
  .addDecorator(withKnobs)
  .add('Postcode lookup',
    withInfo('Required')(() => {
    const label = text('label', 'Postal address');
      return (<PostcodeLookup label={label} isAddressValid={(validation) => console.log(validation) } />);
    }),
  );
