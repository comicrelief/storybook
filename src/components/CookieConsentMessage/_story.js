import React from 'react';
import { storiesOf } from '@storybook/react';

import { withInfo } from '@storybook/addon-info';
import CookieConsentMessage from './CookieConsentMessage';

storiesOf('Cookie Consent Message', module)
  .add('CookieConsentMessage',
    withInfo('Cookie Consent')(() => {
      return (<CookieConsentMessage />);
    }),
  );
