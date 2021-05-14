import React, { Component } from 'react';
import propTypes from 'prop-types';
import InputField from '../InputField/InputField';


class MarketingConsentCheckbox extends Component {
  constructor(props) {
    super(props);

    const item = props.itemData;
    const checkbox = item.id;
    // set the initial validation for the input fields if they exist
    const fieldValidation = item.field !== undefined ? this.emptyInputFields(item) : false;

    this.state = {
      checkboxId: checkbox,
      checkboxValidation: {
        [checkbox]: {
          value: null,
          isFieldsHidden: true,
          valid: true,
          fieldValidation,
          extraInfo: null,
        },
      },
    };
  }

  /**
   * On mount call setValues
   */
  componentDidMount() {
    this.setValues();
  }

  /**
   * If the parent has values already, then use it otherwise use the empty state.
   */
  setValues() {
    const validation = this.props.valueFromParent !== null ? this.props.valueFromParent : this.state.checkboxValidation[this.state.checkboxId];
    this.setState({
      ...this.state,
      checkboxValidation: {
        [this.state.checkboxId]: validation,
      },
    }, () => this.pushValidityToParent(this.state.checkboxId, this.state.checkboxValidation));
  }

  /**
   * Update state with value and validity from child and push field validity to parent
   * @param name
   * @param valid
   * @param checkbox
   */
  setInputValidity(name, valid, checkbox) {
    if ((this.state.checkboxValidation[checkbox].fieldValidation[name].value === undefined || this.state.checkboxValidation[checkbox].fieldValidation[name].value !== valid.value) ||
      (this.state.checkboxValidation[checkbox].fieldValidation[name].message !== valid.message)) {
      this.setState({
        ...this.state,
        checkboxValidation: {
          ...this.state.checkboxValidation,
          [checkbox]: {
            ...this.state.checkboxValidation[checkbox],
            valid: valid.valid !== false,
            fieldValidation: {
              ...this.state.checkboxValidation[checkbox].fieldValidation,
              [name]: {
                valid: valid.valid,
                value: valid.value,
                message: valid.message,
                showErrorMessage: valid.showErrorMessage,
              },
            },
          },
        },
      }, () => this.pushValidityToParent(checkbox, this.state.checkboxValidation));
    }
  }


  /**
   * Return the value from the state. Needed to make the field mutable again.
   * @param checkbox
   * @param fieldName
   * @return {{}}
   */
  fieldValue(checkbox, fieldName) {
    let value = this.state.checkboxValidation[checkbox].fieldValidation;
    if (value[fieldName] !== undefined) {
      value = value[fieldName];
    }
    return value;
  }

  /**
   * The handler enables the user to check and uncheck the checkbox.
   * If the checkbox has fields, it reveals the previously hidden input field according to the selection and
   * resets the input field value.
   * Semi-toggles validation, value and showing the fields.
   */
  handleCheckboxToggle(item, option, event) {
    const value = event.target.value;
    const currentCheckboxState = this.state.checkboxValidation;

    // if item has fields, empty them again.
    const currentValidation = currentCheckboxState[item.id].fieldValidation;
    const unChecked = currentCheckboxState[item.id].value === value;
    // Pass in the 'unchecked' flag to determine whether to clear the field value, or use the existing value
    const fieldValidation = currentValidation === false ? false : this.emptyInputFields(item, currentValidation, unChecked);

    // if item has fields the options should tell you whether to show or hide the fields
    const hideFields = fieldValidation === false ? true : option.hideFields;

    const extraInfo = option.extraInfo || null;

    this.setState({
      checkboxValidation: {
        ...currentCheckboxState,
        [item.id]: {
          ...currentCheckboxState[item.id],
          // check if value is the same to deal with unchecking the checkbox: toggles fields and validation.
          isFieldsHidden: unChecked ? true : hideFields,
          valid: unChecked ? true : hideFields,
          value: !unChecked ? value : null,
          fieldValidation,
          extraInfo,
        },
      },
    }, () => this.pushValidityToParent(item.id, this.state.checkboxValidation));
  }

  pushValidityToParent(name, checkboxValidation) {
    this.props.getValidation(name, checkboxValidation);
  }

  /**
   * Set the field validation info (back) to empty strings.
   * @param item
   * @return {{}}
   */
  emptyInputFields(item, currentValidation = null, clearFields = true) {
    const fieldValidation = {};
    item.field.forEach((field) => {
      fieldValidation[field.name] = {
        valid: '',
        message: '',
        showErrorMessage: '',
        value: currentValidation && !clearFields ? currentValidation[field.name].value : '',
      };
    });
    return fieldValidation;
  }

  render() {
    const item = this.props.itemData;
    const checkbox = item.id;
    const bgStyle = 'form__field--background';
    const customMessage = typeof item.customMessage !== 'undefined' ? item.customMessage : null;
    return (
      <div key={item.id} className={`form__field--wrapper form__field-wrapper--checkbox form__field-wrapper--background form__field-wrapper--${item.name}`}>
        <p className="form__fieldset--label" aria-label={`Can we contact you by ${item.name}`}>{item.text}</p>
        { customMessage && <p>{customMessage}</p> }
        <div id={`field-wrapper--${item.name}`} className="form__field--wrapper">
          {
            item.options.map(option => (
              <div key={option.value} className="form__field--wrapper form__checkbox form__checkbox--inline form__checkbox--inline-2-horizontal">
                <label className="form__field-label required" htmlFor={`field-label--${option.label}`}>
                  {option.label}
                </label>

                <input
                  type="checkbox"
                  id={`field-label--${option.label}`}
                  className="form__field form__field--checkbox"
                  name={option.name}
                  value={option.value}
                  onChange={e => this.handleCheckboxToggle(item, option, e)}
                  checked={this.state.checkboxValidation[checkbox].value === option.value}
                  ariarole="checkbox"
                  aria-label={`field-label--${option.label}`}
                  aria-checked={this.state.checkboxValidation[checkbox].value === option.value}
                />
                <span />
              </div>
            ))
          }
        </div>

        {
          item.options.map(option => (
            (this.state.checkboxValidation[checkbox].extraInfo && this.state.checkboxValidation[checkbox].value === option.value) &&
            <p className="form__field--extra-info" key={`${item.id}--extra-info`}>
              {this.state.checkboxValidation[checkbox].extraInfo
              }</p>
          ))}

        { (!this.state.checkboxValidation[checkbox].isFieldsHidden && item.field) &&
        <div className={bgStyle}>
          {
            item.field.map(field => (
              <div key={field.id} className="form__field--wrapper form__field--sub-field-wrapper">
                <InputField
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  placeholder={field.placeholder}
                  label={field.label}
                  pattern={field.pattern}
                  helpText={field.helpText}
                  isValid={(valid, name) => {
                    this.setInputValidity(name, valid, checkbox);
                  }}
                  emptyFieldErrorText={field.errorMessage}
                  showErrorMessage={this.props.showErrorMessages}
                  fieldValue={this.state.checkboxValidation[checkbox].fieldValidation[field.name]}
                  value={() => this.fieldValue(checkbox, field.name)}
                  // Only use our improved Yup-based validation for the problematic fields
                  yupValidation={field.type === 'email' || field.type === 'tel'}
                />
              </div>
            ))
          }
        </div>
        }
      </div>
    );
  }
}

MarketingConsentCheckbox.defaultProps = {
  valueFromParent: null,
  showErrorMessages: false,
};
MarketingConsentCheckbox.propTypes = {
  getValidation: propTypes.func.isRequired,
  valueFromParent: propTypes.object,
  showErrorMessages: propTypes.bool,
  itemData: propTypes.shape({
    itemData: propTypes.object,
  }).isRequired,
};


export default MarketingConsentCheckbox;
