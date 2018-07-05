import React from 'react';
import { storiesOf } from '@storybook/react';

import { withKnobs } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import PostcodeLookup from './PostcodeLookup';


storiesOf('PostcodeLookup', module)
  .addDecorator(withKnobs)
  .add('Postcode lookup',
    withInfo('Required')(() => {
      return (<PostcodeLookup isAddressValid={(validation) => console.log(validation) }/>);
    }),
  );
