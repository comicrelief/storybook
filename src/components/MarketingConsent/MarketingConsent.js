import React, { Component } from 'react';
import propTypes from 'prop-types';
import MarketingConsentCheckbox from './MarketingConsentCheckbox';
import './MarketingConsent.scss';

import dompurify from 'dompurify';

const sanitizer = dompurify.sanitize;

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

        <div dangerouslySetInnerHTML={{__html: sanitizer(this.props.copy1)}} style={{marginBottom: '15px'}} />

          { data.Questions.map(item =>
            (<MarketingConsentCheckbox key={item.id}
              getValidation={(name, validation) => { this.updateState(name, validation); }}
              itemData={item} valueFromParent={this.props.valueFromParent && this.props.valueFromParent[item.id]}
              showErrorMessages={this.props.showErrorMessages} />
              )
            )
          }

        <div dangerouslySetInnerHTML={{__html: sanitizer(this.props.copy2)}} />

        </div>
      </div>
    );
  }
}

MarketingConsent.defaultProps = {
  valueFromParent: null,
  showErrorMessages: false,
  copy1: `<p>Hear more about the project Comic Relief funds and other ways you can support our work including fundraising, campaigns and products.</p><p>How would you like to hear from us?</p>`,
  copy2: `<p>You can update your communication preferences at any time at&nbsp;
            <a
              href="https://www.comicrelief.com/update-your-preferences"
              target="blank"
              rel="noopener noreferrer"
              class="link inline"
            >
            comicrelief.com/update-your-preferences
              <span class="visuallyhidden">(opens in a new window)</span>
            </a>. Your details will be kept safe, check out our&nbsp;
            <a
              href="https://www.comicrelief.com/privacy-policy"
              target="blank"
              rel="noopener noreferrer"
              class="link inline"
            >
            privacy policy
              <span class="visuallyhidden">(opens in a new window)</span>
            </a> for more details.</p>`,
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
