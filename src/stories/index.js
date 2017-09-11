import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { specs, describe, it } from 'storybook-addon-specifications';

import { mount } from 'enzyme';
import expect from 'expect';

import { Button, Welcome } from '@storybook/react/demo';

import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';

import Footer from '../components/Footer/Footer';
import FileUp from '../components/FileUp/FileUp';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

storiesOf('Footer', module)
  .addDecorator(withKnobs)
  .add('Comic Relief',
    withInfo('doc string about my component')(() => {
      const copy = text('Copy', 'copyright 2017');
      const source = 'http://pr-292-ip25kiy-3g6y4v7pqt6nk.eu.platform.sh';
      return (<Footer copy={copy} source={source} />);
    }),
  )
  .add('Sport Relief',
    withInfo('doc string about my component')(() => {
      const copy = text('Copy', 'copyright 2018');
      const source = 'http://pr-23-avxieja-wf5gj4v6kiu2o.eu.platform.sh';
      return (<Footer copy={copy} source={source} />);
    }),
  );

storiesOf('File Upload', module)
  .addDecorator(withKnobs)
  .add('Single',
    withInfo('File upload')(() => {
      const maxFiles = number('Max Files', 5);
      const story = <FileUp maxFiles={maxFiles} />;

      specs(() => describe('File Upload', () => {
        it('Should have a label and "click to upload" in it', () => {
          const output = mount(story);
          expect(output.find('label').text()).toContain('click to upload');
        });
      }));

      return story;
    }),
  );
