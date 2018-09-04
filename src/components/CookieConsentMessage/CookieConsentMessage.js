import React, { Component } from 'react';
import CookieConsent from 'react-cookie-consent';
import './CookieConsent.scss';


class CookieConsentMessage extends Component {
  render() {
    const option = {
      buttonClass: 'btn btn--white-ghost',
      containerClass: 'cookie-consent cc_container',
      linkClass: 'cc_more_info link link--grey inline',
      buttonText: 'Accept',
      cookieName: 'cookie-consent',
      contentClass: 'cc_message',
      position: 'top',
      domainName: '.comicrelief.com',
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
        extraCookieOptions={{ domain: option.domainName }}
      >
        We use cookies. We’ve recently updated our privacy policy to give you more detail about how we use your personal information.{' '}
        <a href="https://www.comicrelief.com/privacy-notice" className={option.linkClass} target="_blank" rel="noopener noreferrer">
          Read our privacy policy here.
          <span className="visuallyhidden">(opens in a new window)</span>
        </a>
      </CookieConsent>
    );
  }
}

export default CookieConsentMessage;

