import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu from '../Menu/Menu';
import SocialLink from '../SocialLink/SocialLink';
import './footer.scss';

const styles = {
  footer__branding: {
    height: '20%',
    width: '100px',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

class Footer extends Component {
  /**
   * Footer constructor.
   */
  constructor() {
    super();
    this.copy = 'Comic Relief is the trading name of Charity Projects, a registered charity in England and Wales (326568) and Scotland (SC039730), which is a company limited by guarantee registered in England and Wales (01806414). Registered address: Hanover House, 14 Hanover Square, London, W1S 1HP.';
  }
  /**
   * Render footer component.
   * @return {XML}
   */
  render() {
    return (
      <footer style={styles} role="contentinfo">
        <SocialLink campaign={this.props.campaign} />
        <div className="region region-footer cr-footer">
          <Menu type="footer" campaign={this.props.campaign} />
        </div>
        <div className="footer__copyright">
          <p style={styles.p}>{this.copy}</p>
        </div>
        <div className="footer__branding">
          <a title="Comic Relief" href="https://www.comicrelief.com/" rel="home noopener noreferrer" target="_blank" >
            <svg className="icon">
              <use xlinkHref="#crlogo2018" />
            </svg>
          </a>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
  campaign: PropTypes.string.isRequired,
};

export default Footer;
