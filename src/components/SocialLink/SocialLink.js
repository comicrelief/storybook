import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg';
import Svg from '@comicrelief/pattern-lab/sass/base/components/svg/spritesheet.svg';
/**
 * SocialLink class
 */
class SocialLink extends Component {

  render() {
    const campaign = this.props.campaign
    const socialLinks = [{
        network: 'facebook',
        name: 'fb',
        color: '#3d5b96',
        url: 'http://www.facebook.com/'+ campaign,
      }, {
        network: 'twitter',
        name: 'twitter',
        color: '#1fb7ec',
        url: 'http://twitter.com/' + campaign,    
      }, {
        network: 'youtube',
        name: 'youtube',
        color: '#cc3638',
        url: 'https://www.youtube.com/channel/UCdF5u0ggeSETozc8fsprjcw', 
      }, {
      network: 'instagram',
        name: 'instagram',
        color: '#974b96',
        url: 'https://www.instagram.com/' + campaign, 
      },
    ]

    return (
      <div className="footer__social-links">
        <ReactSVG
          path={Svg}
          callback={svg => console.log(svg)}
          className="visually-hidden"
        />
        <ul>
        { socialLinks.map(socialLink => (
          <li>
            <a href={socialLink.url} title={socialLink.network} target="_blank" className={`#icon__${socialLink.name}`}>
              <svg className="icon">
                <use xlinkHref={`#icon-${socialLink.network}`}></use>
              </svg>
            </a>
          </li>
          )
        )}
        </ul>
      </div>
    );
  }
}

SocialLink.propTypes = {
  campaign: PropTypes.string,
};

export default SocialLink;