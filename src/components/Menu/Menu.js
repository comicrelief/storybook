import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connect from '../../utils/drupal-api-connector';
import MenuLink from './MenuLink/MenuLink';
import './menu.scss';

/**
 * Menu class
 */
class Menu extends Component {
  /**
   * componentDidMount
   */
  componentDidMount() {
    const { campaign, type, fetchLinks } = this.props;
    if (typeof campaign !== 'undefined' && typeof type !== 'undefined') {
      switch (campaign) {
        case 'sportrelief':
          this.source = 'https://www.sportrelief.com';
          break;
        default:
          this.source = 'https://www.comicrelief.com';
      }
      fetchLinks(this.source, type);
    }
  }

  /**
   * render
   * @return {XML}
   */
  render() {
    const { menuFetch, type } = this.props;
    if (menuFetch && menuFetch.fulfilled) {
      const source = this.source;
      return (
        <nav className="menu--footer">
          <ul className="menu" id={`${type}-menu`}>
            {menuFetch.value.map(item => <MenuLink baseUrl={source} item={item} key={item.link.title} />)}
          </ul>
        </nav>
      );
    }

    return <div />;
  }
}

Menu.propTypes = {
  campaign: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default connect(() => ({
  fetchLinks: (source, type) => ({
    menuFetch: `${source}/entity/menu/${type}/tree?_format=json`,
  }),
}))(Menu);

