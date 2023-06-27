import React from 'react';
import propTypes from 'prop-types';
import ReactSVG from 'react-svg';
import SvgSprite from '../SVG/spritesheet.svg';
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

const Footer = ({ noSocial, noLinks, campaign, copy, fallbackMenu, forceFallback, additionalMarkup }) => {
  return (
    <footer style={styles} role="contentinfo">
      { noSocial === false && <SocialLink campaign={campaign} /> }
      { noLinks === false &&
      <div className="region region-footer cr-footer">
        <Menu type="footer" campaign={campaign} fallbackMenu={fallbackMenu} forceFallback={forceFallback} />
      </div>
      }

      { /* eslint-disable react/no-danger */ }
      { additionalMarkup && (
        <div className="footer__additional_markup" dangerouslySetInnerHTML={{ __html: additionalMarkup }} />
      ) }

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
  fallbackMenu: propTypes.arrayOf(propTypes.shape({
    url: propTypes.string.isRequired,
    title: propTypes.string.isRequired,
  })).isRequired,
  additionalMarkup: propTypes.string,
};

Footer.defaultProps = {
  noLinks: false,
  noSocial: false,
  forceFallback: false,
  additionalMarkup: null,
};

export default Footer;
