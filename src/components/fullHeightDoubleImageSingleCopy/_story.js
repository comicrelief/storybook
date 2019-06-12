import React from 'react';
import { storiesOf } from '@storybook/react';

import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs';

import FullHeightDoubleImageSingleCopy from './fullHeightDoubleImageSingleCopy';

const copies = [
  " Here's some long addtional copy to help break things, here's somelong addtional copy to help break things, here's some longaddtional copy to help break things, here's some long addtional copy to help break things, here's some long addtional copy to help break things, here 's some long addtional copy to help break things",
  "28 February 2019. One night, one stage, eight giants of comedy live at The SSE Arena, Wembley",
];

storiesOf('Full Height Double Image Single Copy', module)
  .addDecorator(withKnobs)
  .add(
    'Full Height Double Image Single Copy Left',
    withInfo('data visualisation' )(() => {
      const title= text('Title','COPY LEFT TITLE');
      const btnCopy = 'Sign up for pre-sale tickets';
      const position = text('Position','image-right');
      return (<FullHeightDoubleImageSingleCopy
        copies={copies}
        title={title}
        btnCopy={btnCopy}
        position={position}
      />)
    })
  )

