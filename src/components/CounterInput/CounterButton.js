import React, { Component } from 'react';
import propTypes from 'prop-types';


/**
 * CounterButton class
 */
class CounterButton extends Component {
  render() {
    return (
      <div className="form__btn form__btn_counter">
        <input
          type="button"
          id={`${this.props.id}_button`}
          className={`form__btn--${this.props.id} counter-input-${this.props.btnClass} ${this.props.disableClass}`}
          value={this.props.value}
          onClick={e => this.props.onClick(e)}
          disabled={this.props.hasError}
        />
      </div>
    );
  }
}


CounterButton.defaultProps = {
  value: null,
  disableClass: '',
};

CounterButton.propTypes = {
  id: propTypes.string.isRequired,
  btnClass: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  disableClass: propTypes.string,
};

export default CounterButton;
