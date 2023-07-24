import React from 'react';
import { storiesOf } from '@storybook/react';

import { withKnobs, text, boolean, object } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import Footer from './Footer';

storiesOf('Footer', module)
  .addDecorator(withKnobs)
  .add('Comic Relief',
    withInfo('comicrelief.com footer')(() => {
      const copy = text('Copy', 'Comic Relief is the trading name of Charity Projects, a registered charity in England and Wales (326568) and Scotland (SC039730), which is a company limited by guarantee registered in England and Wales (01806414). Registered address: 6th Floor, The White Chapel Building, 10 Whitechapel High Street, London, E1 8QS.');
      const source = 'https://www.comicrelief.com';
      const campaign = 'comicrelief';
      const forceFallback = boolean('forceFallback', false);
      const noSocial = boolean('noSocial', false);
      const noLinks = boolean('noLinks', false);
      const additionalMarkup = '<p style="color: white; text-align: center; margin: 15px auto;">Some unstyled addtional markup</p>'
      const fallbackMenu = object('fallbackMenu', [
        {
          url: 'https://lite.comicrelief.com/legal/privacy-notice',
          title: 'Legal'
        },
        {
          url: 'https://lite.comicrelief.com/legal/',
          title: 'Privacy notice'
        }
      ]);
      return (<Footer copy={copy} source={source} campaign={campaign} noSocial={noSocial} noLinks={noLinks} fallbackMenu={fallbackMenu} forceFallback={forceFallback} additionalMarkup={additionalMarkup}/>);
    }),
  )
  .add('Sport Relief',
    withInfo('sportrelief.com footer')(() => {
      const copy = text('Copy', 'Sport Relief is an initiative of Comic Relief registered charity 326568 (England/Wales); SC039730 (Scotland)');
      const source = 'https://www.sportrelief.com';
      const campaign = 'sportrelief';
      const noSocial = boolean('noSocial', false);
      const forceFallback = boolean('forceFallback', false);
      const noLinks = boolean('noLinks', false);
      const fallbackMenu = object('fallbackMenu',[
        {
          url: 'https://lite.sportrelief.com/terms-of-use',
          title: 'Legal'
        },
        {
          url: 'https://lite.sportrelief.com/privacy-notice',
          title: 'Privacy notice'
        }
      ]);
      return (<Footer copy={copy} source={source} campaign={campaign} noSocial={noSocial} noLinks={noLinks} fallbackMenu={fallbackMenu} forceFallback={forceFallback} />);
    }),
  )
  .add('Red Nose Day',
    withInfo('rednoseday.com footer')(() => {
      const copy = text('Copy', 'copyright 2018');
      const source = 'https://www.comicrelief.com'; // fallback to comicrelief.com
      const campaign = 'rednoseday';
      const noSocial = boolean('noSocial', false);
      const noLinks = boolean('noLinks', false);
      const fallbackMenu = [];
      return (<Footer copy={copy} source={source} campaign={campaign} noSocial={noSocial} noLinks={noLinks} fallbackMenu={fallbackMenu} />);
    }),
  );
