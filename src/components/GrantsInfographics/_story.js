import React from 'react';
import { storiesOf } from '@storybook/react';

import { withInfo } from '@storybook/addon-info';
import GrantsInfographics from './GrantsInfographics';

storiesOf('Grants Infographics', module)
  .add('data visualisation',
    withInfo('data visualisation with React-Vis from Grant API')(() => {
      const GRANTS_API = 'https://1kfs7evxca.execute-api.eu-west-1.amazonaws.com/beta/grants';
      return (<GrantsInfographics grantsAPI={GRANTS_API} />);
    }),
  );

