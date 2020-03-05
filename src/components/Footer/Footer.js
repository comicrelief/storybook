import React from 'react';
import propTypes from 'prop-types';
import SvgSprite from '@comicrelief/pattern-lab/sass/base/components/svg/spritesheet.svg';
import ReactSVG from 'react-svg';

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

const Footer = ({ noSocial, noLinks, campaign, copy, fallbackLinks }) => {
  return (
    <footer style={styles} role="contentinfo">
      { noSocial === false && <SocialLink campaign={campaign} /> }
      { noLinks === false &&
      <div className="region region-footer cr-footer">
        <Menu type="footer" campaign={campaign} fallbackLinks={fallbackLinks} />
      </div>
      }
      <div className="footer__copyright">
        <p style={styles.p}>{copy}</p>
      </div>
      <div className="footer__branding">
        <ReactSVG
          path={SvgSprite}
          className="visually-hidden"
        />
        <a title="Comic Relief" href="https://www.comicrelief.com/" rel="home noopener noreferrer" target="_blank" >
          <svg className="icon">
            <use xlinkHref="#crlogo2018" />
          </svg>
        </a>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  campaign: propTypes.string.isRequired,
  fallbackLinks: propTypes.array,
};

Footer.defaultProps = {
  noLinks: false,
  noSocial: false,
  fallbackLinks: [],
};

export default Footer;
