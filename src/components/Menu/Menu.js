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
    return axios.get('https://content-staging.sls.comicrelief.com/footer')
      .then(({ data }) => data.data)
      .catch(() => []);
  }

  /**
   * render
   * @return {XML}
   */
  render() {
    const { type } = this.props;

    if (this.state.menuItems.length >= 1) {
      return (
        <nav className="menu--footer">
          <ul className="menu" id={`${type}-menu`}>
            {this.state.menuItems.map((item) => {
              if (this.props.campaign === 'sportrelief') {
                return (
                  <li className="menu-item">
                    {(item.link.url.indexOf('http') !== -1) ?
                      <a href={item.link.url} rel="noopener noreferrer" target="_blank">{item.link.title}</a> :
                      <a href={this.props.baseUrl + item.link.url}>{item.link.title}</a>}
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

    return <div />;
  }
}

Menu.propTypes = {
  campaign: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
};

export default Menu;
