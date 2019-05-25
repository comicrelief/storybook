/* eslint-env browser */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import browser from 'browser-detect';

import CounterButton from './CounterButton';
// import './CounterInput.scss';

/**
 * CounterInput class
 * Requires a shape containing required and optional items defining the type of input field.
 * See propTypes below.
 */
class CounterInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valid: '',
      value: '',
      message: '',
      showErrorMessage: false,
      min: props.min,
      max: props.max,
    };
    this.setRef = (element) => {
      this.inputRef = element;
    };
    this.doDecrement = this.doDecrement.bind(this);
    this.doIncrement = this.doIncrement.bind(this);
    this.validateField = this.validateField.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);

    this.decrementMessage = 'Can\'t decrement below min value';
    this.incrementMessage = 'Can\'t increment above max value';
  }

  componentWillMount() {
    this.setState({
      value: this.getInputValue(),
    });
  }
  /**
   * Return and renders the give input value from the parent component.
   */
  componentDidMount() {
    this.validateField();
  }

  /**
   * If parent updates the value update state with new value
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (typeof this.props.value === 'function' && this.state.value !== nextProps.value()) {
      this.setState({
        ...this.state,
        value: nextProps.value(),
      });
    }
  }

  /**
   * If value from parent and value is different send state to parent.
   * Validate field if parent wants to show error messages
   */
  componentDidUpdate() {
    this.sendStateToParent();
  }

  /**
   * Handle the onChange and onBlur events
   * @param e
   */
  onChangeHandler(e) {
    const value = e.target.value;
    this.setState({
      value,
      showErrorMessage: true,
    });
    this.validateField(e);
  }

  /**
   * Get value and its validity from parent
   * @return {*}
   */
  getInputValue() {
    let value;
    if (this.props.value !== undefined) {
      value = this.props.value;
    }
    return value;
  }

  doDecrement() {
    if (this.state.value > this.state.min) {
      this.setState({
        value: parseInt(this.state.value, 10) - 1,
        message: null,
      });
    } else {
      this.setState({
        message: this.decrementMessage,
      });
    }
  }
  doIncrement() {
    if (this.state.value < this.state.max) {
      this.setState({
        value: parseInt(this.state.value, 10) + 1,
        message: null,
      });
    } else {
      this.setState({
        message: this.incrementMessage,
      });
    }
  }

  /**
   * Uses isValid callback function sending state, value and field name to parent
   */
  sendStateToParent() {
    if (typeof this.props.isValid === 'function') {
      this.props.isValid(this.state, this.props.name, this.state.value);
    }
  }

  /**
   * Validate the input and update the state with validation info
   * @param e
   */
  validateField(e) {
    const value = e !== undefined ? e.target.value : this.inputRef.value;

    if (this.props.required === true && value === '') {
      this.setState({
        valid: false,
        message: 'This field is required',
        value,
      });
    } else if (this.props.required === true && value) {
      this.setState({
        valid: true,
        message: '',
        value,
        showErrorMessage: false,
      });
    } else {
      this.setState({
        valid: true,
        message: '',
        value,
        showErrorMessage: false,
      });
    }
  }

  render() {
    const extraClassName = this.props.extraClass !== '' ? this.props.extraClass : '';

    // Error logic
    const errorClassName = this.props.showErrorMessage === true ? 'form__field-error-wrapper' : '';
    const hasError = this.state.valid === false || (this.props.showErrorMessage === true && this.state.message !== '');
    const hasErrorClass = hasError ? 'form__field--erroring' : '';
    const error = hasError ? 'form__field--error-outline' : '';
    const isBrowser = browser();

    const supportedAriaAttributes = isBrowser.name === 'firefox' && isBrowser.os.match('Windows') ?
      { 'aria-live': 'assertive', 'aria-relevant': 'additions removals' } : { 'aria-live': 'assertive', role: 'status' };

    const disableClass = hasError ? 'button-inactive' : '';

    return (
      <div id={`field-wrapper--${this.props.id}`}>
        <div className={`form__fieldset form__field--wrapper form__field-wrapper--text form__field-wrapper--background ${errorClassName} ${extraClassName} ${hasErrorClass}`}>
          <label
            id={`field-label--${this.props.id}`}
            htmlFor={`field-input--${this.props.id}`}
            className={`form__field-label${this.props.required ? ' required' : ''} ${this.state.valid === false ? 'error' : ''}`}
          >
            {this.props.label}
            {!this.props.required &&
            <span>&nbsp;(Optional)&nbsp;</span>
            }
          </label>
          {this.props.helpText &&
          <p className="form-help-text">{this.props.helpText}</p>
          }
          <div className={`field-wrapper-counter-input form__field--${this.props.id}`} >
            <CounterButton
              id={this.props.id}
              btnClass="left-btn"
              disableClass={disableClass}
              value={this.props.leftButton}
              onClick={e => this.doDecrement(e)}
              hasError={hasError}
            />
            <input
              type="text"
              id={`field-input--${this.props.id}`}
              name={this.props.name && this.props.name}
              className={`form__field form__field--text form__field--text-counter-input ${error}`}
              required={this.props.required}
              min={this.props.min}
              max={this.props.max}
              aria-describedby={`field-label--${this.props.id} field-error--${this.props.id}`}
              ref={this.setRef}
              value={this.state.value}
              readOnly
              onChange={this.onChangeHandler}
            />
            <CounterButton
              id={this.props.id}
              btnClass="right-btn"
              disableClass={disableClass}
              value={this.props.rightButton}
              onClick={e => this.doIncrement(e)}
              hasError={hasError}
            />
          </div>
          { hasError &&
          <div
            id={`field-error--${this.props.id}`}
            className="form__field-error-container form__field-error-container--text"
            {...supportedAriaAttributes}
          >
            <span className="form-error">
              {this.state.message}
            </span>
          </div>
          }
        </div>
        {this.props.additionalText !== null &&
        <div className="form__fieldset form__field--wrapper  form__field-additional-text">
          { /* eslint-disable react/no-danger */ }
          <div dangerouslySetInnerHTML={{ __html: this.props.additionalText }} />
        </div>
        }
      </div>
    );
  }
}

CounterInput.defaultProps = {
  value: null,
  required: false,
  min: null,
  max: null,
  leftButton: '-',
  rightButton: '+',
  extraClass: '',
  helpText: '',
  emptyFieldErrorText: '',
  invalidErrorText: '',
  isValid: null,
  showErrorMessage: null,
  setBackgroundColor: null,
  additionalText: null,
  fieldValue: null,
};

CounterInput.propTypes = {
  id: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  required: propTypes.bool,
  value: propTypes.string.isRequired,
  min: propTypes.number,
  max: propTypes.number,
  leftButton: propTypes.string,
  rightButton: propTypes.string,
  extraClass: propTypes.string,
  helpText: propTypes.string,
  emptyFieldErrorText: propTypes.string,
  invalidErrorText: propTypes.string,
  isValid: propTypes.func,
  showErrorMessage: propTypes.bool,
  setBackgroundColor: propTypes.bool,
  additionalText: propTypes.string,
  fieldValue: propTypes.object,
};

export default CounterInput;
