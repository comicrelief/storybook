import React, { Component } from 'react';
import propTypes from 'prop-types';
import CookieConsent from 'react-cookie-consent';
import './CookieConsent.scss';


class CookieConsentMessage extends Component {
  constructor(props) {
    super(props);
    this.finishedLoading = this.finishedLoading.bind(this);
  }
  componentDidMount() {
    // Bind our custom event to the 'finished loading' event, so we're not trying to
    // access an element that has yet to be rendered
    window.addEventListener('DOMContentLoaded', this.finishedLoading);
  }

  finishedLoading() {
    // Explicity add tabindex for NVDA this way, as we can't easily get at the underlying template markup
    setTimeout(() => {
      document.querySelector('.cookie-consent.cc_container .btn').tabIndex = 0;
    }, 2000);
  }

  render() {
    const option = {
      buttonClass: 'btn btn--white-ghost',
      containerClass: 'cookie-consent cc_container',
      linkClass: 'cc_more_info link link--grey inline',
      buttonText: 'Accept',
      cookieName: 'cookie-consent',
      contentClass: 'cc_message',
      position: 'top',
    };

    return (
      <CookieConsent
        disableStyles
        location={option.position}
        buttonText={option.buttonText}
        cookieName={option.cookieName}
        containerClasses={option.containerClass}
        buttonClasses={option.buttonClass}
        contentClasses={option.contentClass}
        extraCookieOptions={{ domain: `.${this.props.domainName}.com` }}
      >
        We use cookies. We’ve recently updated our privacy policy to give you more detail about how we use your personal information.{' '}
        <a href="https://www.comicrelief.com/privacy-notice" className={option.linkClass} target="_blank" rel="noopener noreferrer" tabIndex="0">
          Read our privacy policy here.
          <span className="visuallyhidden">(opens in a new window)</span>
        </a>
      </CookieConsent>
    );
  }
}

CookieConsentMessage.defaultProps = {
  domainName: 'comicrelief',
};

CookieConsentMessage.propTypes = {
  domainName: propTypes.string,
};

export default CookieConsentMessage;

