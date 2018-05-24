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
   * Calls validateField method if field is a checkbox.
   * Calls inputHandler callback.
   */
  onChangeHandler(e) {
    if (e.target.required && e.target.type === 'checkbox') {
      this.validateField(e);
    }
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
  }

  // Handles the props of the valid data to be push up to the parent component
  handleInputChange = () => {
    if (typeof this.props.isValid === 'function') {
      this.props.isValid(this.state.valid);
    }
  }

  render() {
    return (
      <div id={`field-wrapper--${this.props.id}`} className={`form__fieldset form__field-wrapper form__field-wrapper--${this.props.type} ${this.props.extraClass ? this.props.extraClass : ''}`}>
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
          ref={this.inputField}
          type={this.props.type}
          id={`field-input--${this.props.id}`}
          name={this.props.name && this.props.name}
          className={`form__field form__field--${this.props.type} ${this.state.valid ? '' : 'error'} ${this.props.extraClass ? this.props.extraClass : ''} `}
          required={this.props.required && this.props.required}
          placeholder={this.props.placeholder && this.props.placeholder}
          min={this.props.min && this.props.min}
          max={this.props.max && this.props.max}
          defaultChecked={this.props.defaultChecked && this.props.defaultChecked}
          pattern={this.props.pattern && this.props.pattern}
          aria-describedby={`field-label--${this.props.id} field-error--${this.props.id}`}
          onBlur={this.props.type !== 'checkbox' ? this.validateField : undefined}
          onChange={this.props.type !== 'checkbox' ? this.handleInputChange : e => this.onChangeHandler(e)}
        />
        {this.props.type === 'checkbox' &&
        // span for checkbox styling
        <span />
        }
        {this.state.valid === false &&
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
  pattern: '',
  placeholder: '',
  min: null,
  max: null,
  defaultChecked: null,
  extraClass: '',
  helpText: '',
  emptyFieldErrorText: '',
  invalidErrorText: '',
  inputHandler: () => {},
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
  inputHandler: propTypes.func,
  isValid: propTypes.func,
};

export default InputField;
