import React, { Component } from 'react';
import propTypes from 'prop-types';
import ReactSVG from 'react-svg';
import SvgSprite from '@comicrelief/pattern-lab/sass/base/components/svg/spritesheet.svg';
/* svg with gradient background */
import SvgInsta from '@comicrelief/pattern-lab/sass/base/components/svg/instagram.svg';

/**
 * SocialLink class
 */
class SocialLink extends Component {
  render() {
    const campaign = this.props.campaign;
    const socialLinks = [{
      network: 'facebook',
      name: 'fb',
      url: `https://www.facebook.com/${campaign === 'rednoseday' ? `official${campaign}`: campaign}`,
    }, {
      network: 'twitter',
      name: 'twitter',
      url: `https://twitter.com/${campaign}`,
    }, {
      network: 'youtube',
      name: 'youtube',
      url: 'https://www.youtube.com/channel/UCdF5u0ggeSETozc8fsprjcw',
    }, {
      network: 'instagram',
      name: 'instagram',
      url: `https://www.instagram.com/${campaign}`,
    },
    ];

    return (
      <div className="footer__social-links">
        <ReactSVG
          path={SvgSprite}
          className="visually-hidden"
        />
        <ul>
          { socialLinks.map(socialLink => (
            <li key={socialLink.network}>
              <a
                href={socialLink.url}
                title={socialLink.network}
                rel="noopener noreferrer"
                target="_blank"
                className={`icon__${socialLink.name}`}
              >
                { socialLink.network !== 'instagram' ?
                  <svg className="icon">
                    <use xlinkHref={`#icon-${socialLink.network}`} />
                  </svg> :
                  <img src={SvgInsta} alt={socialLink.network} />
                }
              </a>
            </li>
          ),
          )}
        </ul>
      </div>
    );
  }
}

SocialLink.propTypes = {
  campaign: propTypes.string.isRequired,
};

export default SocialLink;
