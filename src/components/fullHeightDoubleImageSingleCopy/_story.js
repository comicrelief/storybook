import React from 'react';
import { storiesOf } from '@storybook/react';

import { withInfo } from '@storybook/addon-info';
import FullHeightDoubleImageSingleCopy from './fullHeightDoubleImageSingleCopy';

const copies = [
  " Here's some long addtional copy to help break things, here's somelong addtional copy to help break things, here's some longaddtional copy to help break things, here's some long addtional copy to help break things, here's some long addtional copy to help break things, here 's some long addtional copy to help break things",
  "28 February 2019. One night, one stage, eight giants of comedy live at The SSE Arena, Wembley{' '}"
];

const leftTitle = "COPY LEFT TITLE";
const rightTitle = "COPY RIGHT TITLE";

const btnCopy = "Sign up for pre-sale tickets";

storiesOf('Full Height Double Image Single Copy', module)
  .add('Full Height Double Image Single Copy Left',
    withInfo('data visualisation with React-Vis from Grant API')(() => {
      return (
        <FullHeightDoubleImageSingleCopy
          copies = {copies}
          title = {rightTitle}
          btnCopy = {btnCopy}
          />
      );
    }),
  )
  .add('Full Height Double Image Single Copy Right',
  withInfo('data visualisation with React-Vis from Grant API')(() => {
    return (
      <FullHeightDoubleImageSingleCopy
        copies = {copies}
        title = {leftTitle}
        btnCopy = {btnCopy}
      />);
  }),
);