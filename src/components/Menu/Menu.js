import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import MenuLink from './MenuLink/MenuLink';
import './menu.scss';

/**
 * Menu class
 */
class Menu extends Component {
  /**
   * Menu constructor
   */
  constructor() {
    super();
    this.state = {
      menuItems: [],
    };
  }

  /**
   * componentDidMount
   */
  async componentWillMount() {
    const { campaign, type } = this.props;
    if (typeof campaign !== 'undefined' && typeof type !== 'undefined') {
      switch (campaign) {
        case 'sportrelief':
          this.source = 'https://www.sportrelief.com';
          break;
        default:
          this.source = 'https://www.comicrelief.com';
      }

      this.setState({
        menuItems: await this.getJson(this.source, type),
      });
    }
  }

  /**
   * Get json feed from sites
   * @param source
   * @param type
   * @return {Promise<any>}
   */
  async getJson(source, type) {
    return axios.get(`${source}/entity/menu/${type}/tree?_format=json`)
      .then(({ data }) => data)
      .catch(() => []);
  }

  /**
   * render
   * @return {XML}
   */
  render() {
    const { type } = this.props;

    if (this.state.menuItems.length >= 1) {
      const source = this.source;
      return (
        <nav className="menu--footer">
          <ul className="menu" id={`${type}-menu`}>
            {this.state.menuItems.map(item => <MenuLink baseUrl={source} item={item} key={item.link.title} />)}
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

export default Menu;
