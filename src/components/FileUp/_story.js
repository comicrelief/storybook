import React from 'react';
import { storiesOf } from '@storybook/react';
import { specs, describe, it } from 'storybook-addon-specifications';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import FileUp from './FileUp';

storiesOf('File Upload', module)
  .addDecorator(withKnobs)
  .add('Single',
    withInfo('File upload')(() => {
      const maxFiles = number('Max Files', 5);
      const maxSize = number('Max Size', 2000000);
      const types = text('Types', 'image/*, application/pdf');
      return (<FileUp maxFiles={maxFiles} maxSize={maxSize} types={types} onChange={() => {}} />);
    }),
  );
