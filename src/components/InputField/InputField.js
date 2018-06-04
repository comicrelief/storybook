/* eslint-env browser */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import fieldValidation from './validation';

/**
 * InputField class
 * Requires a shape containing required and optional items defining the type of input field.
 * See propTypes below.
 */
class InputField extends Component {
  constructor() {
    super();
    // this.inputField = React.createRef();
    this.validateField = this.validateField.bind(this);
    this.state = {
      valid: null,
      message: '',
    };
  }
  /**
   * Calls helper function to validate the input field
   * Sets the the state for the validation and validation message
   */
  validateField(e) {
    const props = {
      field: e.target,
      label: this.props.label,
      required: this.props.required,
      min: this.props.min,
      max: this.props.max,
      pattern: this.props.pattern,
      emptyError: this.props.emptyFieldErrorText,
      invalidError: this.props.invalidErrorText,
    };
    let validation = this.state;
    // helper function will return an updated validation object
    validation = fieldValidation(props, validation);
    this.setState(validation);

    return validation;
  }

  /**
   * Calls validateField method if field is a checkbox.
   * Calls inputHandler callback.
   * Handles the callback isValid state to parent component.
   */
  handleInputChange(e) {
    if (e.target.required && e.target.type === 'checkbox') {
      this.validateField(e);
    }
    this.handleInputValidation(e);
  }

  handleInputValidation(e) {
    if (typeof this.props.isValid === 'function') {
      this.props.isValid(this.validateField(e), this.props.name, e.target.value);
    }
  }

  handleOnBlur(e) {
    if (e.target.type !== 'checkbox') {
      this.validateField(e);
    }
  }
  render() {
    const errorClassName = this.state.valid === false || this.props.showErrorMessage === true ? 'form__field-error-wrapper' : '';
    const optionClassName = this.props.extraClass ? this.props.extraClass : '';
    return (
      <div id={`field-wrapper--${this.props.id}`} className={`form__fieldset form__field-wrapper form__field-wrapper--${this.props.type} ${errorClassName} ${optionClassName}`}>
        <label id={`field-label--${this.props.id}`} htmlFor={`field-input--${this.props.id}`} className={`form__field-label${this.props.required ? ' required' : ''}`}>
          {this.props.label}
          {!this.props.required &&
          <span>&nbsp;(Optional)&nbsp;</span>
          }
        </label>
        {this.props.helpText &&
        <p className="form-help-text">{this.props.helpText}</p>
        }
        <input
          type={this.props.type}
          id={`field-input--${this.props.id}`}
          name={this.props.name && this.props.name}
          className={`form__field form__field--${this.props.type} ${this.state.valid ? '' : 'error'} ${optionClassName} `}
          required={this.props.required && this.props.required}
          placeholder={this.props.placeholder && this.props.placeholder}
          min={this.props.min && this.props.min}
          max={this.props.max && this.props.max}
          defaultChecked={this.props.defaultChecked && this.props.defaultChecked}
          pattern={this.props.pattern && this.props.pattern}
          aria-describedby={`field-label--${this.props.id} field-error--${this.props.id}`}
          onBlur={e => this.handleOnBlur(e)}
          onChange={e => this.handleInputChange(e)}
        />
        {this.props.type === 'checkbox' &&
        // span for checkbox styling
        <span />
        }
        {this.state.valid === false || this.props.showErrorMessage === true ?
          <div
            id={`field-error--${this.props.id}`}
            className={`form__field-error-container form__field-error-container--${this.props.type}`}
            aria-live="assertive"
            role="status"
          >
            <span className="form-error">
              {(this.props.showErrorMessage === true || this.state.valid === false) && this.state.message}
            </span>
          </div> : ''
        }
      </div>
    );
  }
}

InputField.defaultProps = {
  pattern: '',
  placeholder: '',
  min: null,
  max: null,
  defaultChecked: null,
  extraClass: '',
  helpText: '',
  emptyFieldErrorText: '',
  invalidErrorText: '',
  isValid: () => {},
  showErrorMessage: null,
};


InputField.propTypes = {
  id: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  required: propTypes.bool.isRequired,
  pattern: propTypes.string,
  placeholder: propTypes.string,
  min: propTypes.number,
  max: propTypes.number,
  defaultChecked: propTypes.bool,
  extraClass: propTypes.string,
  helpText: propTypes.string,
  emptyFieldErrorText: propTypes.string,
  invalidErrorText: propTypes.string,
  isValid: propTypes.func,
  showErrorMessage: propTypes.bool,
};

export default InputField;
