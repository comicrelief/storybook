import React, { Component } from 'react';
import propTypes from 'prop-types';
import MarketingConsentCheckbox from './MarketingConsentCheckbox';
import './MarketingConsent.scss';

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
   * @return {XML}
   */
  render() {
    const data = this.props.itemData;
    return (
      <div className={'form__row form__row--marketing-consent'} >
        <div className="form__fieldset">
          <p>Hear more about the project Comic Relief funds and other ways you can support our work including fundraising, campaigns and products.</p>
          <p>How would you like to hear from us?</p>
          { data.Questions.map(item =>
            (<MarketingConsentCheckbox
              key={item.id}
              getValidation={(name, validation) => { this.updateState(name, validation); }}
              itemData={item}
              valueFromParent={this.props.valueFromParent && this.props.valueFromParent[item.id]}
              showErrorMessages={this.props.showErrorMessages}
            />)) }
          <p>You can update your communication preferences at any time at&nbsp;
            <a
              href="https://www.comicrelief.com/update-your-preferences."
              target="blank"
              rel="noopener noreferrer"
              className="link inline"
            >
            comicrelief.com/update-your-preferences.
              <span className="visuallyhidden">(opens in a new window)</span>
            </a> Your details will be kept safe, check out our&nbsp;
            <a
              href="https://www.comicrelief.com/privacy-policy"
              target="blank"
              rel="noopener noreferrer"
              className="link inline"
            >
            privacy policy
              <span className="visuallyhidden">(opens in a new window)</span>
            </a> for more details.</p>
        </div>
      </div>
    );
  }
}

MarketingConsent.defaultProps = {
  valueFromParent: null,
  showErrorMessages: false,
};
MarketingConsent.propTypes = {
  getValidation: propTypes.func.isRequired,
  valueFromParent: propTypes.object,
  showErrorMessages: propTypes.bool,
  itemData: propTypes.shape({
    itemData: propTypes.object,
  }).isRequired,
};

export default MarketingConsent;
