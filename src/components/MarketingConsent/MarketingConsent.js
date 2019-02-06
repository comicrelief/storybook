import React, { Component } from 'react';
import propTypes from 'prop-types';
import MarketingConsentCheckbox from './MarketingConsentCheckbox';

class MarketingConsent extends Component {
  render() {
    const data = this.props.itemData;
    return (
      <div className={'form__row form__row--marketing-consent'} >
        <p>Hear more about the project Comic Relief funds and other ways you can support our work including fundraising, campaigns and products.</p>
        <p>How would you like to hear from us?</p>
        { data.Questions.map(item =>
          (<MarketingConsentCheckbox
            key={item.id}
            getValidation={(validation) => { this.props.getValidation(validation); }}
            itemData={item}
            valueFromParent={this.props.valueFromParent && this.props.valueFromParent[item.text]}
          />)) }
        <p>You can update your communication preferences at any time at comicrelief.com/update-your-preferences. Your details will be kept safe, check out our
          <a
            href="https://www.comicrelief.com/privacy-policy"
            target="blank"
            rel="noopener noreferrer"
            className="link link--dark-purple"
          >
          privacy policy
            <span className="visuallyhidden">(opens in a new window)</span>
          </a> for more details.</p>
      </div>
    );
  }
}

MarketingConsent.defaultProps = {
  valueFromParent: null,
};
MarketingConsent.propTypes = {
  getValidation: propTypes.func.isRequired,
  valueFromParent: propTypes.object,
  itemData: propTypes.shape({
    itemData: propTypes.object,
  }).isRequired,
};

export default MarketingConsent;
