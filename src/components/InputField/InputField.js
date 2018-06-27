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
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.state = {
      valid: null,
      message: '',
    };
    this.setRef = (element) => {
      this.inputRef = element;
    };
  }

  componentDidUpdate() {
    if (this.props.showErrorMessage === true && this.state.message === '' && this.state.valid === null) {
      this.validateField(null, this.inputRef);
    }
  }

  /**
   * Calls helper function to validate the input field
   * Sets the the state for the validation and validation message
   */
  validateField(e, field) {
    const props = {
      field: (e !== null) ? e.target : field,
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
   * Handles the callback isValid state to parent component.
   */
  handleInputChange(e) {
    if ((e.target.required && e.target.type === 'checkbox')) {
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

  /**
   * Callback to handle the button click.
   */
  btnClickHandler() {
    if (typeof this.props.buttonClick === 'function') {
      this.props.buttonClick()
        .then((result) => {
          console.log('result', result);
        });
    }
  }
  render() {
    const errorClassName = this.props.showErrorMessage === true ? 'form__field-error-wrapper' : '';
    const showBackgroundClassName = this.props.setBackgroundColor === true && this.props.type === 'checkbox' ? 'form__field-wrapper--background' : '';
    const extraClassName = this.props.extraClass !== '' ? this.props.extraClass : '';
    return (
      <div id={`field-wrapper--${this.props.id}`} className={`form__fieldset form__field--wrapper form__field-wrapper--${this.props.type} ${errorClassName} ${showBackgroundClassName} ${extraClassName} `}>
        <label id={`field-label--${this.props.id}`} htmlFor={`field-input--${this.props.id}`} className={`form__field-label${this.props.required ? ' required' : ''} ${this.state.valid === false ? 'error' : ''}`}>
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
          className={`form__field form__field--${this.props.type} ${extraClassName} `}
          required={this.props.required && this.props.required}
          placeholder={this.props.placeholder && this.props.placeholder}
          min={this.props.min && this.props.min}
          max={this.props.max && this.props.max}
          defaultChecked={this.props.defaultChecked && this.props.defaultChecked}
          pattern={this.props.pattern && this.props.pattern}
          aria-describedby={`field-label--${this.props.id} field-error--${this.props.id}`}
          onBlur={e => this.handleOnBlur(e)}
          onChange={e => this.handleInputChange(e)}
          ref={this.setRef}
          value={this.props.value && this.props.value}
        />
        {this.props.inlineButton === true &&
        <div className="form__btn">
          <input
            type="button"
            id={`${this.props.id}_button`}
            className={`form__btn--${this.props.id}`}
            value={this.props.buttonValue}
            onClick={e => this.btnClickHandler(e)}
          />
        </div>


        }
        {this.props.type === 'checkbox' &&
        // span for checkbox styling
        <span />
        }
        {(this.state.valid === false || (this.props.showErrorMessage === true && this.state.message !== '')) &&
          <div
            id={`field-error--${this.props.id}`}
            className={`form__field-error-container form__field-error-container--${this.props.type}`}
            aria-live="assertive"
            role="status"
          >
            <span className="form-error">
              {this.state.message}
            </span>
          </div>
        }
      </div>
    );
  }
}

InputField.defaultProps = {
  value: undefined,
  pattern: '',
  placeholder: '',
  min: null,
  max: null,
  inlineButton: false,
  buttonValue: '',
  buttonClick: null,
  defaultChecked: null,
  extraClass: '',
  helpText: '',
  emptyFieldErrorText: '',
  invalidErrorText: '',
  isValid: null,
  showErrorMessage: null,
  setBackgroundColor: null,
};

InputField.propTypes = {
  id: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  required: propTypes.bool.isRequired,
  value: propTypes.string,
  pattern: propTypes.string,
  placeholder: propTypes.string,
  min: propTypes.number,
  max: propTypes.number,
  inlineButton: propTypes.bool,
  buttonValue: propTypes.string,
  buttonClick: propTypes.func,
  defaultChecked: propTypes.bool,
  extraClass: propTypes.string,
  helpText: propTypes.string,
  emptyFieldErrorText: propTypes.string,
  invalidErrorText: propTypes.string,
  isValid: propTypes.func,
  showErrorMessage: propTypes.bool,
  setBackgroundColor: propTypes.bool,
};

export default InputField;
