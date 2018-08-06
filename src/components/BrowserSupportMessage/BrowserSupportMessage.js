import React, { Component } from 'react';
import { detect } from 'detect-browser';
import './BrowserSupport.scss';

class BrowserSupportMessage extends Component {
  constructor() {
    super();
    this.state = {
      showBrowserNotification: false,
    };
  }

  componentDidMount() {
    this.browserSupportMessage();
  }

  /**
   * Checks if browser is IE and version 9 and changes the state.
   */
  browserSupportMessage() {
    const browser = detect();

    if (browser) {
      if (browser.name === 'ie' && browser.version.match('9')) {
        this.setState({
          showBrowserNotification: true,
        });
      }
    }
  }

  render() {
    return (
      <div>
        {
          this.state.showBrowserNotification &&
          <div className="browser-message">
            <p>Unfortunately, this page doesn’t work with your version of Internet Explorer. <br />
              <a href="http://browser-update.org/update-browser.html#3.1.13:browser-update.org" className="link" target="parent" rel="nofollow">
            Please change or update your browser
              </a>
            </p>
          </div>
        }
      </div>
    );
  }
}

export default BrowserSupportMessage;
