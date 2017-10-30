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
    if (typeof this.props.campaign !== 'undefined' && typeof this.props.type !== 'undefined') {
      switch (this.props.campaign) {
        case 'sportrelief':
          this.source = 'https://www.sportrelief.com';
          break;
        default:
          this.source = 'https://www.comicrelief.com';
      }
      this.props.fetchLinks(this.source, this.props.type);
    }
  }

  /**
   * render
   * @return {XML}
   */
  render() {
    if (this.props.menuFetch && this.props.menuFetch.fulfilled) {
      const source = this.source;
      return (
        <nav className="menu--footer">
          <ul className="menu" id={`${this.props.type}-menu`}>
            {this.props.menuFetch.value.map(item => <MenuLink baseUrl={source} item={item} key={item.link.title} />)}
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

