import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SocialIcon } from 'react-social-icons';
import './social-link.scss';

/**
 * SocialLink class
 */
class SocialLink extends Component {

  render() {

    const campaign = this.props.campaign
    const socialLinks = [{
        network: 'facebook',
        color: '#3d5b96',
        url: 'http://www.facebook.com/'+ campaign,
      }, {
        network: 'twitter',
        color: '#1fb7ec',
        url: 'http://twitter.com/' + campaign,    
      }, {
        network: 'youtube',
        color: '#cc3638',
        url: 'https://www.youtube.com/channel/UCdF5u0ggeSETozc8fsprjcw', 
      }, {
      network: 'instagram',
        color: '#974b96',
        url: 'https://www.instagram.com/' + campaign, 
      },
    ]

    return (
      <div className="footer__social-links">
        <ul>
        { socialLinks.map(socialLink => (
          <li key={socialLink.network}>
            <SocialIcon url={socialLink.url} color={socialLink.color}/>
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