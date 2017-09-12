import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';

import Footer from '../components/Footer/Footer';
import SchoolsLookUp from '../components/SchoolsLookUp/SchoolsLookUp';

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
  		return (<Footer copy={copy} source={source}/>);
  	}),
  )
  .add('Sport Relief',
    withInfo('doc string about my component')(() => {
      const copy = text('Copy', 'copyright 2018');
      const source = 'http://pr-23-avxieja-wf5gj4v6kiu2o.eu.platform.sh';
      return (<Footer copy={copy} source={source}/>);
    }),
  );

storiesOf('SchoolsLookUp', module)
  .addDecorator(withKnobs)
  .add('Schools Look Up',
    withInfo('A schools address look up field')(() => {
      const min = number('MinLenght', 3)
      const endpoint = text('Endpoint', 'https://bilw38ca93.execute-api.eu-west-1.amazonaws.com/production/schools/lookup?query=');
      return (<SchoolsLookUp data={endpoint} min={min} />);
    }),
  );
