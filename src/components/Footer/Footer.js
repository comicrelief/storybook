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
    this.copy = 'Comic Relief 2017. Comic Relief, registered charity 326568 (England/Wales); SC039730 (Scotland)';
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
          <Menu type="footer" source={this.props.source} />
        </div>
        <div className="footer__copyright">
          <p style={styles.p}>{this.copy}</p>
        </div>
        <div style={styles.footer__branding}>
          <a title="Comic Relief" href="http://www.comicrelief.com/" rel="noopener noreferrer" target="_blank">
            <img src="http://www.comicrelief.com/themes/custom/comicrelief/logo.svg" alt="Comic Relief logo" />
          </a>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
  source: PropTypes.string.isRequired,
  campaign: PropTypes.string.isRequired,
};

export default Footer;
