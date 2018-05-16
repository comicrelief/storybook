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
      fieldProps: this.props.field,
    };
    let validation = this.state;
    // helper function will return an updated validation object
    validation = fieldValidation(props, validation);
    this.setState(validation);
  }
  render() {
    return (
      <div id={`field-wrapper--${this.props.field.id}`} className={`form__fieldset form__field-wrapper form__field-wrapper--${this.props.field.type} ${this.props.field.extraClass ? this.props.field.extraClass : ''}`}>
        <label id={`field-label--${this.props.field.id}`} htmlFor={`field-input--${this.props.field.id}`} className={`form__field-label${this.props.field.required ? ' required' : ''}`}>
          {this.props.field.label}
          {!this.props.field.required &&
          <span>&nbsp;(Optional)&nbsp;</span>
          }
        </label>
        {this.props.field.helpText !== undefined &&
        <span className="form-help-text">{this.props.field.helpText}</span>
        }
        <input
          ref={this.inputField}
          type={this.props.field.type}
          id={`field-input--${this.props.field.id}`}
          className={`form__field form__field--${this.props.field.type} ${this.state.valid ? '' : 'error'} ${this.props.field.extraClass ? this.props.field.extraClass : ''} `}
          required={this.props.field.required && this.props.field.required}
          placeholder={this.props.field.placeholder && this.props.field.placeholder}
          min={this.props.field.min && this.props.field.min}
          max={this.props.field.max && this.props.field.max}
          aria-describedby={`field-label--${this.props.field.id} field-error--${this.props.field.id}`}
          onBlur={this.props.field.type !== 'checkbox' ? this.validateField : undefined}
          onChange={this.props.field.required && this.props.field.type === 'checkbox' ? this.validateField : undefined}
        />
        {this.props.field.type === 'checkbox' &&
        // span for checkbox styling
        <span />
        }
        {this.state.valid === false &&
        <div
          id={`field-error--${this.props.field.id}`}
          className={`form__field-error-container form__field-error-container--${this.props.field.type}`}
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


InputField.propTypes = {
  field: propTypes.shape({
    id: propTypes.string.isRequired,
    type: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    label: propTypes.string.isRequired,
    required: propTypes.bool.isRequired,
    pattern: propTypes.string,
    placeholder: propTypes.string,
    min: propTypes.number,
    max: propTypes.number,
    checked: propTypes.bool,
    extraClass: propTypes.string,
    helpText: propTypes.string,
    emptyFieldErrorText: propTypes.string,
    invalidErrorText: propTypes.string,
  }).isRequired,
};

export default InputField;