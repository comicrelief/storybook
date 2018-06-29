import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './JustInTime.scss';


class JustInTime extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: null,
    };
  }

  handleToggle(e) {
    e.preventDefault();
    const isClicked = this.state.isOpen;

    if (!isClicked) {
      this.setState({
        isOpen: true,
      });
    } else {
      this.setState({
        isOpen: false,
      });
    }
  }

  render() {
    const toggleState = this.state.isOpen === null || this.state.isOpen === true ? 'show' : 'close';
    const openToggleContent = this.state.isOpen === true ? 'show' : 'close';
    return (
      <div className="form__row form__row--just-in-time-block">
        <div className="form__fieldset">
          <a
            href={`#${toggleState}-public`}
            aria-expanded={this.state.isOpen}
            className={`link toggle-link ${toggleState}-link`}
            aria-label={`click to ${toggleState}`}
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

JustInTime.PropTypes = {
  linkText: PropTypes.string.isRequired,
};

export default JustInTime;
