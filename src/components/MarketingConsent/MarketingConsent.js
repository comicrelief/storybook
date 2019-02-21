import React, { Component } from 'react';
import propTypes from 'prop-types';
import MarketingConsentCheckbox from './MarketingConsentCheckbox';
import './MarketingConsent.scss';

class MarketingConsent extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
  }

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
   * Handle the show and hide of content with a toggle action.
   * @param {*} e
   */
  handleToggle(e) {
    e.preventDefault();

    this.setState({
      isOpen: this.state.isOpen === false,
    });
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
    const toggleState = this.state.isOpen === true ? 'close' : 'show';
    const openToggleContent = this.state.isOpen === true ? 'show' : 'close';
    const data = this.props.itemData;
    return (
      <div className={'form__row form__row--marketing-consent'} >
        <div className="form__fieldset">
          <p>Hear more about the project Comic Relief funds and other ways you can support our work including fundraising, campaigns and products.</p>
          <a
            href={`#${toggleState}-public`}
            aria-expanded={this.state.isOpen}
            className={`link toggle-link ${toggleState}-link`}
            aria-label={this.state.isOpen === true ? 'Click to close' : 'Click to open for more information on why we are asking for this information'}
            onClick={e => this.handleToggle(e)}
          >
            How would you like to hear from us?
          </a>
          <div className={`marketing-consent--content marketing-consent--content-${openToggleContent}`}>
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
