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
    try {
      if (typeof campaign !== 'undefined' && typeof type !== 'undefined') {
        if (campaign === 'sportrelief') {
          this.source = 'https://www.sportrelief.com';

          this.setState({
            menuItems: await this.getSportReliefJson(this.source, type),
          });
        } else {
          this.source = 'https://content.sls.comicrelief.com/footer';

          this.setState({
            menuItems: await this.getComicReliefJson(source),
          });
        }
      }
    } catch (error) {
      console.log('error');
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
  async getComicReliefJson(source) {
    return axios.get(source)
      .then(({ data }) => data.data)
      .catch(() => []);
  }

  /**
   * render
   * @return {XML}
   */

  /**
   * if Drupal is down
   * render fallback menu (props)
   */

  render() {
    const { type, campaign, baseUrl, fallbackMenu } = this.props;
    const { menuItems } = this.state;

    if (menuItems.length >= 1) {
      return (
        <nav className="menu--footer">
          <ul className="menu" id={`${type}-menu`}>
            {menuItems.map((item) => {
              const url = item.link ? item.link.url : item.url;
              const title = item.link ? item.link.title : item.title;

              if (campaign === 'sportrelief') {
                return (
                  <li className="menu-item" key={`${type}-menu-${title}`}>
                    {(url.indexOf('http') !== -1) ?
                      <a href={url} rel="noopener noreferrer" target="_blank">{title}</a> :
                      <a href={baseUrl + url}>{title}</a>}
                  </li>
                );
              }

              return (
                <li className="menu-item" key={`${type}-menu-${title}`}>
                  {(url.indexOf('http') !== -1) ?
                    <a href={url} rel="noopener noreferrer" target="_blank">{title}</a> :
                    <a href={url}>{title}</a>}
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
          {fallbackMenu.map((item) => {
            return (
              <li className="menu-item" key={item.title}>
                <a href={item.url}>{item.title}</a>
              </li>);
          },
          )}
        </ul>
      </nav>
    );
  }
}

Menu.propTypes = {
  campaign: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  fallbackMenu: propTypes.arrayOf(propTypes.shape({
    url: propTypes.string.isRequired,
    title: propTypes.string.isRequired,
  })).isRequired,
};

Menu.defaultProps = {
  fallbackMenu: [],
};

export default Menu;
