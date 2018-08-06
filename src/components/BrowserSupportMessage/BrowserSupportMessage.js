import React, { Component } from 'react';
import { detect } from 'detect-browser';

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
      <div className="browser-message">
        {
          this.state.showBrowserNotification &&
          <p>Unfortunately, this page doesn’t work with your version of Internet Explorer. <br />
            <a href="http://browser-update.org/update-browser.html#3.1.13:browser-update.org" className="link" target="parent" rel="nofollow">
            Please change or update your browser
            </a>
          </p>
        }
      </div>
    );
  }
}

export default BrowserSupportMessage;
