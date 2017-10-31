import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { specs, describe, it } from 'storybook-addon-specifications';

import { mount } from 'enzyme';
import expect from 'expect';

import { withKnobs, text, number } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import Footer from '../components/Footer/Footer';
import SchoolsLookUp from '../components/SchoolsLookUp/SchoolsLookUp';
import FileUp from '../components/FileUp/FileUp';
import GrantsNearYou from '../components/GrantsNearYou/GrantsNearYou';

class Container extends Component {
  constructor (props) {
    super(props);
    this.state = props;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (data) {
    this.setState({
      value: data.value
    }, () => {
      this.props.action('data changed')(data);
    });
  }

  render () {
    const self = this;
    const children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        ...this.state
      });
    });

    return (
      <div className={this.props.className}>
        {children}
      </div>
    );
  }
}

storiesOf('Welcome', module).add('to Storybook', () => <h1>Welcome to CR Storybook</h1>);

storiesOf('SchoolsLookUp', module)
  .addDecorator((story) => {
    const schoolsLookUpProps = {
      min: number('Min Length', 3),
      endpoint: text(
        'Endpoint',
        'https://bilw38ca93.execute-api.eu-west-1.amazonaws.com/production/schools/lookup?query=',
      ),
      establishmentIdIdentifier: 'establishmentIdValue',
      establishmentIdValue: '',
      establishmentNameIdentifier: 'establishmentNameValue',
      establishmentNameValue: '',
      address1Identifier: 'address1Value',
      address1Value: '',
      address2Identifier: 'address2Value',
      address2Value: '',
      address3Identifier: 'address3Value',
      address3Value: '',
      townIdentifier: 'townValue',
      townValue: '',
      postcodeIdentifier: 'postcodeValue',
      postcodeValue: '',
    }
    return (<Container {...schoolsLookUpProps} onChange={(identifier, event) => { console.log('this.state', this.state); this.state[identifier] = event.target.value }}>{story()}</Container>)
  })
  .add('Schools Look Up',
    withInfo('A schools address look up field')(() => {
      
      return (<SchoolsLookUp
        
      />);
    }),
  );

storiesOf('Footer', module)
  .addDecorator(withKnobs)
  .add('Comic Relief',
    withInfo('comicrelief.com footer')(() => {
      const campaign = 'comicrelief';
      return (<Footer campaign={campaign} />);
    }),
  )
  .add('Sport Relief',
    withInfo('sportrelief.com footer')(() => {
      const campaign = 'sportrelief';
      return (<Footer campaign={campaign} />);
    }),
  )
  .add('Red Nose Day',
    withInfo('rednoseday.com footer')(() => {
      const campaign = 'rednoseday';
      return (<Footer campaign={campaign} />);
    }),
  );

storiesOf('File Upload', module)
  .addDecorator(withKnobs)
  .add('Single',
    withInfo('File upload')(() => {
      const maxFiles = number('Max Files', 5);
      const maxSize = number('Max Size', 2000000);
      const types = text('Types', 'image/*, application/pdf');
      const story = <FileUp maxFiles={maxFiles} maxSize={maxSize} types={types} />;

      specs(() => describe('File Upload', () => {
        it('Should have a label and "click to upload" in it', () => {
          const output = mount(story);
          expect(output.find('label').text()).toContain('click to upload');
        });
      }));

      return story;
    }),
  );

storiesOf('GrantsNearYou', module)
  .add('GrantsNearYou',
    withInfo('doc string about my component')(() => {
      const SEARCH = 'https://1kfs7evxca.execute-api.eu-west-1.amazonaws.com/beta/grants-geo';
      const POSTCODE_API = 'https://api.postcodes.io';
      return (<GrantsNearYou searchURL={SEARCH} postcodeAPI={POSTCODE_API} />);
    }),
  );
