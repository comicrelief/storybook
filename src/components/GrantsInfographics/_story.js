import React from 'react';
import { storiesOf } from '@storybook/react';

import { withInfo } from '@storybook/addon-info';
import GrantsInfographics from './GrantsInfographics';

storiesOf('Grants Infographics', module)
  .add('data visualisation',
    withInfo('data visualisation with React-Vis from Grant API')(() => {
      return (<GrantsInfographics  />);
    }),
  );
