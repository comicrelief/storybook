/* eslint-env browser */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import browser from 'browser-detect';
import fieldValidation from './validation';

/**
 * InputField class
 * Requires a shape containing required and optional items defining the type of input field.
 * See propTypes below.
 */
class InputField extends Component {
  constructor(props) {
    super(props);
    this.validateField = this.validateField.bind(this);
    this.state = {
      valid: '',
      value: '',
      message: '',
      showErrorMessage: false,
    };
    this.setRef = (element) => {
      this.inputRef = element;
    };
  }

  /**
   * Return and renders the give input value from the parent component.
   */
  componentDidMount() {
    this.setInputValue();
  }

  /**
   * If component receives different props from parent, update state
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    // Update state if parent provides a new value
    let isValueFromParent = false;
    if (typeof nextProps.value === 'function') {
      const item = this.getValue();
      if (item !== undefined) {
        isValueFromParent = true;
        this.setState((prevState) => {
          let newState;
          if (item.value !== prevState.value) {
            newState = {
              value: item.value,
              message: item.message,
              valid: item.valid,
              showErrorMessage: item.showErrorMessage,
            };
          } else if (nextProps.showErrorMessage !== prevState.showErrorMessage) {
            newState = {
              ...prevState,
              showErrorMessage: nextProps.showErrorMessage,
            };
          }
          return newState;
        });
      }
    }

    // Update state if there's no new value coming from the parent,
    // but the parent has updated the invalidErrorText or showErrorMesssage
    if (isValueFromParent === false &&
      (nextProps.invalidErrorText !== this.state.invalidErrorText
        || nextProps.showErrorMessage !== this.state.showErrorMessage)) {
      const stateObject = nextProps.fieldValue !== null ? nextProps.fieldValue : this.state;

      this.setState({
        ...stateObject,
        message: nextProps.invalidErrorText !== this.props.invalidErrorText ? nextProps.invalidErrorText : stateObject.message,
        showErrorMessage: nextProps.showErrorMessage,
      });
    }
  }

  /**
   * If value from parent and value is different send state to parent.
   * Validate field if parent wants to show error messages
   */
  componentDidUpdate() {
    if (this.props.type !== 'checkbox' && typeof this.props.isValid === 'function') {
      this.props.isValid(this.state, this.props.name, this.state.value);
    }
    if (this.state.showErrorMessage === true && this.state.message === '') {
      this.handleInputValidation();
    }
    // keeping this to not break certain environments
    if (this.props.showErrorMessage === true && this.state.message === '' && this.state.valid === null) {
      this.validateField(this.inputRef);
    }
  }

  /**
   * This sets and stores the input value, error  message, valid state that has passed down from the
   * parent component.
   */
  setInputValue() {
    const { fieldValue } = this.props;
    if (fieldValue !== null) {
      this.setState({
        ...fieldValue,
      });
    }
  }


  /**
   * Get value and its validity from parent
   * @return {*}
   */
  getValue() {
    let value;
    if (this.props.value(this.props.id) !== undefined) {
      value = this.props.value(this.props.id);
    }
    return value;
  }

  /**
   * Calls helper function to validate the input field
   * Sets the the state for the validation and validation message
   */
  validateField(field) {
    const props = {
      field: field,
      type: this.props.type,
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
    this.setState({
      value: validation.value,
      message: validation.message,
      valid: validation.valid,
      showErrorMessage: validation.showErrorMessage,
    });
    return validation;
  }

  /**
   * Calls validateField method.
   * Handles the callback isValid state to parent component.
   */
  handleInputValidation(e) {
    const field = (e !== undefined && e !== null) ? e.target : this.inputRef;
    const validation = this.validateField(field);

    if (typeof this.props.isValid === 'function') {
      this.props.isValid(validation, this.props.name, validation.value);
    }
  }

  /**
   * Calls callback to handle the button click.
   * If there's a result from the parent (e.g. validation info from API) set the state with this new validation info
   * Expects callback to be a promise
   */
  btnClickHandler() {
    if (typeof this.props.buttonClick === 'function') {
      this.props.buttonClick()
        .then((result) => {
          if (result) {
            this.setState({
              ...this.state,
              valid: result.valid,
              message: result.message,
              showErrorMessage: result.showErrorMessage,
            });
          }
        });
    }
  }
  render() {
    const showBackgroundClassName = this.props.setBackgroundColor === true && this.props.type === 'checkbox' ? 'form__field-wrapper--background' : '';
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
        <div className={`form__fieldset form__field--wrapper form__field-wrapper--${this.props.type} ${errorClassName} ${showBackgroundClassName} ${extraClassName} ${hasErrorClass}`}>
          <label
            id={`field-label--${this.props.id}`}
            htmlFor={`field-input--${this.props.id}`}
            className={`form__field-label${this.props.required ? ' required' : ''} ${this.state.valid === false ? 'error' : ''}`}
          >
            {this.props.label}
            {(!this.props.required && this.props.type !== 'checkbox') &&
            <span>&nbsp;(Optional)&nbsp;</span>
            }
          </label>
          {this.props.helpText &&
          <p className="form-help-text">{this.props.helpText}</p>
          }
          <div className={`form__field--${this.props.id}`} >
            <input
              type={this.props.type}
              id={`field-input--${this.props.id}`}
              name={this.props.name && this.props.name}
              className={`form__field form__field--${this.props.type} ${error}`}
              required={this.props.required}
              placeholder={this.props.placeholder && this.props.placeholder}
              min={this.props.min && this.props.min}
              max={this.props.max && this.props.max}
              defaultChecked={this.props.defaultChecked && this.props.defaultChecked}
              pattern={this.props.pattern && this.props.pattern}
              aria-describedby={`field-label--${this.props.id} field-error--${this.props.id}`}
              onBlur={e => this.handleInputValidation(e)}
              onChange={e => this.handleInputValidation(e)}
              ref={this.setRef}
              value={this.state.value}
            />
            {this.props.inlineButton === true &&
            <div className="form__btn">
              <input
                type="button"
                id={`${this.props.id}_button`}
                className={`form__btn--${this.props.id} ${disableClass}`}
                value={this.props.buttonValue}
                onClick={e => this.btnClickHandler(e)}
                disabled={hasError}
              />
            </div>
            }
            {this.props.type === 'checkbox' &&
            // span for checkbox styling
            <span />
            }
          </div>
          { hasError &&
          <div
            id={`field-error--${this.props.id}`}
            className={`form__field-error-container form__field-error-container--${this.props.type}`}
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

InputField.defaultProps = {
  value: null,
  pattern: '',
  required: false,
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
  additionalText: null,
  fieldValue: null,
};

InputField.propTypes = {
  id: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  required: propTypes.bool,
  value: propTypes.func,
  pattern: propTypes.oneOfType([
    propTypes.string,
    propTypes.instanceOf(RegExp),
  ]),
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
  additionalText: propTypes.string,
  fieldValue: propTypes.object,
};

export default InputField;
