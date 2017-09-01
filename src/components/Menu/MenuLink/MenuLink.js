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
          <span className="menu-item__text">{item.link.title}</span>}

        <ul className="main-nav__items menu--level-1">
        {item.subtree.map((submenuItem, submenuItemKey) => {
          return <SubMenuLink item={submenuItem} key={submenuItemKey}  />;
        })}
        </ul>

      </li>

    )

  }

}

export default MenuLink;