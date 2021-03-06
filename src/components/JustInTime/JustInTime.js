import React, { Component } from 'react';
import propTypes from 'prop-types';
import './JustInTime.scss';


class JustInTime extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
  }

  /**
   * Handle the show and hide of content with a toggle action.
   * @param {*} e
   */
  handleToggle(e) {
    e.preventDefault();

    this.setState({
      isOpen: this.state.isOpen === false,
    });
  }

  render() {
    const toggleState = this.state.isOpen === true ? 'close' : 'show';
    const openToggleContent = this.state.isOpen === true ? 'show' : 'close';
    return (
      <div className="form__row form__row--just-in-time-block">
        <div className="form__fieldset">
          <a
            href={`#${toggleState}-public`}
            aria-expanded={this.state.isOpen}
            className={`link toggle-link ${toggleState}-link`}
            aria-label={this.state.isOpen === true ? 'Click to close' : 'Click to open for more information on why we are asking for this information'}
            onClick={e => this.handleToggle(e)}
          >
            {this.props.linkText}
          </a>
          <div className={`just-in-time--content just-in-time--content-${openToggleContent}`}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

JustInTime.propTypes = {
  linkText: propTypes.string.isRequired,
};

export default JustInTime;
