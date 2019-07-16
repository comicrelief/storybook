import React from 'react';
import { storiesOf } from '@storybook/react';

import { withInfo } from '@storybook/addon-info';
import BrowserSupportMessage from './BrowserSupportMessage';

storiesOf('Browser Support message', module)
  .add('BrowserSupportMessage ',
    withInfo('Browser Support message')(() => {
      return (
        <div data-test-id="container">
            <p>Browser support message for IE9</p>    
            <BrowserSupportMessage />
        </div>
        );
    }),
  );
