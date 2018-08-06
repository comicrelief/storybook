import React from 'react';
import { storiesOf } from '@storybook/react';

import { withInfo } from '@storybook/addon-info';
import BrowserSupportMessage from './BrowserSupportMessage';

storiesOf('Browser Support Message', module)
  .add('BrowserSupportMessage',
    withInfo('Browser support')(() => {
      return (
        <div>
            <p>Browser message appears in unsupported browser IE 9</p>
            <BrowserSupportMessage />
        </div>);
    }),
  );
