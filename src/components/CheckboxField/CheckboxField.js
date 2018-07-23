import React, { Component } from 'react';
import propTypes from 'prop-types';

class CheckboxField extends Component {
  render() {
    const {
      setBackgroundColor,
      id,
      type,
      label,
      name,
      required,
      checked,
      helpText,
      value,
      errorMessage,
      handleCheckboxChange,
    } = this.props;

    const showBackgroundClassName = setBackgroundColor === true ? 'form__field-wrapper--background' : '';

    return (
      <div id={`field-wrapper--${id}`}>
        <div className={`form__fieldset form__field--wrapper form__field-wrapper--${type} ${showBackgroundClassName}`}>
          <label
            id={`field-label--${id}`}
            htmlFor={`field-input--${id}`}
            className={`form__field-label${required ? ' required' : ''}`}
          >
            {label}
          </label>

          {helpText &&
          <p className="form-help-text">
            {helpText}
          </p>
          }

          <div className={`form__field--${id}`} >
            <input
              className={`form__field form__field--${type} `}
              type={type}
              id={id}
              name={name}
              required={required}
              aria-describedby={`field-label--${id} field-error--${id}`}
              onChange={handleCheckboxChange}
              checked={checked}
              value={value}
            />
            <span />
          </div>

          {this.props.showErrorMessage === true &&
          <div
            id={`field-error--${id}`}
            className={`form__field-error-container form__field-error-container--${type}`}
            aria-live="assertive"
            role="status"
          >
            <span className="form-error">
              {errorMessage}
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


CheckboxField.defaultProps = {
  required: false,
  helpText: null,
  showErrorMessage: null,
  setBackgroundColor: null,
  additionalText: null,
  checked: null,
  errorMessage: null,
  value: null,
  handleCheckboxChange: () => {},
};

CheckboxField.propTypes = {
  id: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  value: propTypes.number,
  required: propTypes.bool,
  helpText: propTypes.string,
  showErrorMessage: propTypes.bool,
  errorMessage: propTypes.string,
  setBackgroundColor: propTypes.bool,
  additionalText: propTypes.string,
  checked: propTypes.bool,
  handleCheckboxChange: propTypes.func,
};

export default CheckboxField;
