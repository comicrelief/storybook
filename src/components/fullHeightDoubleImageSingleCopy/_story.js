import React from 'react';
import { storiesOf } from '@storybook/react';

import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, select } from '@storybook/addon-knobs';

import FullHeightDoubleImageSingleCopy from './fullHeightDoubleImageSingleCopy';
import buttonsColour from './buttonColour';

storiesOf('Full Height Double Image Single Copy', module)
  .addDecorator(withKnobs)
  .add(
    'Full Height Double Image Single Copy',
    withInfo('data visualisation')(() => {
      const AlignmentOptions = {
        'image-left': 'image-left',
        'image-right': 'image-right',
      };

      const btnColourOptions = buttonsColour.reduce((acc, cur, i) => {
        acc[cur] = cur;
        return acc;
      }, {});

      const btnColours = select(
        'Button-Colour',
        btnColourOptions,
        'btn--dark-orange',
      );
      const btnCopy = text('Button-copy', 'Sign up for pre-sale tickets');
      const btnLink = text(
        'Button-link',
        'https://www.comicrelief.com/#newsletter',
      );
      const btnTitle = text('Button-title', 'find out more about Spectacular');
      const position = select('Position', AlignmentOptions, 'image-left');
      const title = text('Title', 'COPY LEFT TITLE');
      const copies = text(
        'copy',
        `Here's some long addtional copy to help break things, here's somelong addtional copy to help break things, here's some longaddtional copy to help break things, here's some long addtional copy to help break things, here's some long addtional copy to help break things, here 's some long addtional copy to help break things,
      28 February 2019. One night, one stage, eight giants of comedy live at The SSE Arena, Wembley`,
      );

      return (
        <FullHeightDoubleImageSingleCopy
          copies={copies}
          title={title}
          btnCopy={btnCopy}
          btnLink={btnLink}
          btnTitle={btnTitle}
          position={position}
          btnColour={btnColours}
        />
      );
    }),
  );
