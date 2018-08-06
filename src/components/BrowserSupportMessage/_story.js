import React from 'react';
import { storiesOf } from '@storybook/react';

import { withInfo } from '@storybook/addon-info';
import BrowserSupportMessage from './BrowserSupportMessage';

storiesOf('Browser Support', module)
  .add('BrowserSupportMessage',
    withInfo('Browser Support')(() => {
      return (<BrowserSupportMessage />);
    }),
  );
