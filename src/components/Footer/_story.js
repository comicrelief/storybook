import React from 'react';
import { storiesOf } from '@storybook/react';

import { withKnobs, text } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import Footer from './Footer';

storiesOf('Footer', module)
  .addDecorator(withKnobs)
  .add('Comic Relief',
    withInfo('comicrelief.com footer')(() => {
      const copy = text('Copy', 'copyright 2017');
      const source = 'https://www.comicrelief.com';
      const campaign = 'comicrelief';
      return (<Footer copy={copy} source={source} campaign={campaign} />);
    }),
  )
  .add('Sport Relief',
    withInfo('sportrelief.com footer')(() => {
      const copy = text('Copy', 'copyright 2018');
      const source = 'https://www.sportrelief.com';
      const campaign = 'sportrelief';
      return (<Footer copy={copy} source={source} campaign={campaign} />);
    }),
  )
  .add('Red Nose Day',
    withInfo('rednoseday.com footer')(() => {
      const copy = text('Copy', 'copyright 2018');
      const source = 'https://www.comicrelief.com'; // fallback to comicrelief.com
      const campaign = 'rednoseday';
      return (<Footer copy={copy} source={source} campaign={campaign} />);
    }),
  );
