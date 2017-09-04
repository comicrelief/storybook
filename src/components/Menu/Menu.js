import React, { Component } from 'react';
import connect from '../../utils/drupal-api-connector';
import MenuLink from "./MenuLink/MenuLink";
import './menu.scss';

/**
 * Menu class
 */
class Menu extends Component {

  /**
   * render
   * @return {XML}
   */
  render() {
    if (this.props.menuFetch.fulfilled) {
      return (
        <nav role="navigation" className="menu--footer">
          <ul className="menu" id={this.props.type + '-menu'}>
            {this.props.menuFetch.value.map((item,key) => {
              return <MenuLink item={item} key={key}/>;
            })}
          </ul>
        </nav>
      )
    }

    return <div/>;
  }

}

export default connect(props => ({
  menuFetch: `${props.source}/entity/menu/${props.type}/tree?_format=json`,
}))(Menu);
