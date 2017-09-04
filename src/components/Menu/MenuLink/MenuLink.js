import React, { Component } from 'react';
import SubMenuLink from './MenuLink';

/**
 * MenuLink class
 */
class MenuLink extends Component {

  /**
   * render
   * @return {XML}
   */
  render() {
    const item = this.props.item;

    console.log(item.children);
    return (

      <li className="menu-item">
        {(item.link.url.indexOf('http') !== -1) ?
          <a href={item.link.url} target="_blank">{item.link.title}</a> :
          <a href={item.link.url}>{item.link.title}</a>}
      </li>

    )

  }

}

export default MenuLink;