/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import DOMPurify from 'dompurify';

import MarketingConsentCheckbox from './MarketingConsentCheckbox';
import './MarketingConsent.scss';

DOMPurify.setConfig({ ADD_ATTR: ['target'] });
const sanitizer = DOMPurify.sanitize;

class MarketingConsent extends Component {
  /**
   * Send State containing new validation data to parent.
   * @param prevProps (needed for arguments order)
   * @param prevState
   */
  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.props.getValidation(this.state);
    }
  }

  /**
   * Add each Marketing consent question's validation data to the state.
   * @param name
   * @param validation
   */
  updateState(name, validation) {
    this.setState({
      ...this.state,
      [name]: validation[name],
    });
  }

  /**
   * Render text and MarketingConsentCheckbox components.
   * @return {*}
   */
  render() {
    const data = this.props.itemData;
    return (
      <div className={'form__row form__row--marketing-consent'} >
        <div className="form__fieldset">

          {this.props.copy1 !== null &&
            <div dangerouslySetInnerHTML={{ __html: sanitizer(this.props.copy1) }} style={{ marginBottom: '15px' }} />
          }

          {data.Questions.map(item =>
            (<MarketingConsentCheckbox
              key={item.id}
              getValidation={(name, validation) => { this.updateState(name, validation); }}
              itemData={item}
              valueFromParent={this.props.valueFromParent && this.props.valueFromParent[item.id]}
              showErrorMessages={this.props.showErrorMessages}
            />))
          }
          {this.props.copy2 !== null &&
            <div dangerouslySetInnerHTML={{ __html: sanitizer(this.props.copy2) }} />
          }

        </div>
      </div>
    );
  }
}

MarketingConsent.defaultProps = {
  valueFromParent: null,
  showErrorMessages: false,
  copy1: `<p>We&#39d like to send you updates on the work we&#39re funding and how your support makes a difference in the UK and around the world.</p>
  <p>Please tick the relevant boxes below if you would like to hear from us.</p>`,
  copy2: `<p>Update your preferences at any time by visiting our

  <a href="https://www.comicrelief.com/update-your-preferences" 
  title="Preferences centre"
  target="_blank"
  rel="noopener noreferrer"
  class="link inline"
  ">preferences centre</a>. 

  Your details will be kept safe, see our
  <a href="https://www.comicrelief.com/privacy-policy" 
  title="Privacy policy"
  target="_blank"
  rel="noopener noreferrer"
  class="link inline"
  >privacy policy</a> 
  
  for more information.</p>`,
};
MarketingConsent.propTypes = {
  copy1: propTypes.string,
  copy2: propTypes.string,
  getValidation: propTypes.func.isRequired,
  valueFromParent: propTypes.object,
  showErrorMessages: propTypes.bool,
  itemData: propTypes.shape({
    itemData: propTypes.object,
  }).isRequired,
};

export default MarketingConsent;
