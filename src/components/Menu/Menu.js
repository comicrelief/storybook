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
   * render
   * @return {XML}
   */
  render () {
    if (this.props.menuFetch.fulfilled) {
      const source = this.props.source;
      return (
        <nav className="menu--footer">
          <ul className="menu" id={`${this.props.type}-menu`}>
            {this.props.menuFetch.value.map(item => <MenuLink baseUrl={source} item={item} key={item} />)}
          </ul>
        </nav>
      );
    }

    return <div />;
  }
}

Menu.propTypes = {
  menuFetch: PropTypes.object,
  source: PropTypes.string,
  type: PropTypes.string,
};

export default connect(props => ({
  menuFetch: `${props.source}/entity/menu/${props.type}/tree?_format=json`,
}))(Menu);
