import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
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
      if (campaign === 'sportrelief') {
        this.source = 'https://www.sportrelief.com';

        this.setState({
          menuItems: await this.getSportReliefJson(this.source, type),
        });
      } else {
        this.source = 'https://www.comicrelief.com';

        this.setState({
          menuItems: await this.getComicReliefJson(),
        });
      }
    }
  }

  /**
   * Get json feed from sites
   * @param source
   * @param type
   * @return {Promise<any>}
   */
  async getSportReliefJson(source, type) {
    return axios.get(`${source}/entity/menu/${type}/tree?_format=json`)
      .then(({ data }) => data)
      .catch(() => []);
  }

  /**
   * Get json feed from sites
   * @return {Promise<any>}
   */
  async getComicReliefJson() {
    return axios.get('https://content.sls.comicrelief.com/footer')
      .then(({ data }) => data.data)
      .catch(() => []);
  }

  /**
   * render
   * @return {XML}
   */

  render() {
    const { type, campaign, baseUrl } = this.props;
    const { menuItems } = this.state;

    if (menuItems.length >= 1) {
      return (
        <nav className="menu--footer">
          <ul className="menu" id={`${type}-menu`}>
            {menuItems.map((item) => {
              if (campaign === 'sportrelief') {
                return (
                  <li className="menu-item">
                    {(item.link.url.indexOf('http') !== -1) ?
                      <a href={item.link.url} rel="noopener noreferrer" target="_blank">{item.link.title}</a> :
                      <a href={baseUrl + item.link.url}>{item.link.title}</a>}
                  </li>
                );
              }

              return (
                <li className="menu-item">
                  {(item.url.indexOf('http') !== -1) ?
                    <a href={item.url} rel="noopener noreferrer" target="_blank">{item.title}</a> :
                    <a href={item.url}>{item.title}</a>}
                </li>
              );
            })}
          </ul>
        </nav>
      );
    }
    return (
      <nav className="menu--footer">
        <ul className="menu" id={`${type}-menu`}>
          <div>
            <li className="menu-item">
              <a href={campaign === 'sportrelief' ? 'https://lite.sportrelief.com/terms-of-use' : 'https://lite.comicrelief.com/legal/'} rel="noopener noreferrer" target="_blank">Legal</a>
            </li>
            <li className="menu-item">
              <a href={campaign === 'sportrelief' ? 'https://lite.sportrelief.com/privacy-notice' : 'https://lite.comicrelief.com/legal/privacy-notice'} rel="noopener noreferrer" target="_blank">Privacy policy</a>
            </li>
          </div>
        </ul>
      </nav>
    );
  }
}

Menu.propTypes = {
  campaign: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
};

export default Menu;

