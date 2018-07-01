import React from 'react';
import { storiesOf } from '@storybook/react';

import { withInfo } from '@storybook/addon-info';
import JustInTime from './JustInTime';

storiesOf('Just In Time Message', module)
  .add('JustInTime',
    withInfo('Just In Time Message')(() => {
      const linkText = 'What you can expect to recieve from us';
      return (<JustInTime linkText={linkText}>
            <p><strong>Name, email and billing address:</strong> we need it to create a receipt for your payment nd send it to you.</p>
            <p><strong>Phone number:</strong> we collect it in case there is an issue with donation</p>
            <p><strong>Establishment information:</strong> we use this information to understand better which institutions raise money for us.</p>
          </JustInTime>  
      );
    }),
  );
