import React, { Component } from 'react';
import propTypes from 'prop-types';
import InputField from '../InputField/InputField';


class MarketingPreferences extends Component {
  constructor(props) {
    super(props);

    const items = props.itemData;
    const checkbox = items.text;
    // set the initial validation for the input fields
    const fieldValidation = this.emptyInputFields(items);

    this.state = {
      checkboxName: checkbox,
      checkboxValidation: {
        [checkbox]: {
          checkedState: null,
          isFieldsHidden: true,
          fieldValidation,
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
    const validation = this.props.valueFromParent !== null ? this.props.valueFromParent : this.state.checkboxValidation[this.state.checkboxName];
    this.setState({
      ...this.state,
      checkboxValidation: {
        [this.state.checkboxName]: validation,
      },
    });
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
      }, () => this.pushValidityToParent(this.state.checkboxValidation));
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
   * The handler enables the user to uncheck and check the checkbox.
   * It reveals the previously hidden input field according to the selection.
   * Resets the inputfield value.
   */
  handleCheckboxToggle(item, element, event) {
    const value = event.target.value;
    const fieldValidation = this.emptyInputFields(item);
    this.setState(prevState => ({
      checkboxValidation: {
        ...this.state.checkboxValidation,
        [item.text]: {
          ...this.state.checkboxValidation[item.text],
          isFieldsHidden: prevState.checkboxValidation[item.text].checkedState === value ? true : element.hideFields,
          checkedState: prevState.checkboxValidation[item.text].checkedState !== value ? value : null,
          fieldValidation,
        },
      },
    }), () => this.pushValidityToParent(this.state.checkboxValidation));
  }

  pushValidityToParent(checkboxValidation) {
    this.props.getValidation(checkboxValidation);
  }

  /**
   * Set the field validation info (back) to empty strings.
   * @param item
   * @return {{}}
   */
  emptyInputFields(item) {
    const fieldValidation = {};
    item.field.forEach((field) => {
      fieldValidation[field.name] = {
        valid: '',
        value: '',
        message: '',
        showErrorMessage: '',
      };
    });
    return fieldValidation;
  }


  render() {
    const item = this.props.itemData;
    const bgStyle = 'form__field--background';
    const checkbox = item.text;
    return (
      <div key={item.id} className="form__row form__field--wrapper form__field-wrapper--checkbox">
        <p className="form__fieldset--label" aria-label={`Can we contact you by ${item.text}`}>{item.text}</p>
        <div id={`field-wrapper--${item.text}`} className="form__field--wrapper">
          {
            item.options.map(element => (
              <div key={element.value} className="form__field--wrapper form__checkbox form__checkbox--inline">
                <label className="form__field-label required" htmlFor={`field-label--${element.label}`}>
                  {element.label}
                </label>
                <input
                  type="checkbox"
                  id={`field-label--${element.label}`}
                  className="form__field form__field--checkbox"
                  name={element.name}
                  value={element.value}
                  onChange={e => this.handleCheckboxToggle(item, element, e)}
                  checked={this.state.checkboxValidation[checkbox].checkedState === element.value}
                  ariarole="checkbox"
                  aria-label={`field-label--${element.label}`}
                  aria-checked={this.state.checkboxValidation[checkbox].checkedState === element.value}
                />
                <span />
              </div>
            ))
          }
        </div>
        { !this.state.checkboxValidation[checkbox].isFieldsHidden &&
        <div className={bgStyle}>
          {
            item.field.map(element => (
              <div key={element.id} className="form__field--wrapper">
                <InputField
                  type={element.type}
                  id={element.name}
                  name={element.name}
                  required={element.required}
                  placeholder={element.placeholder}
                  label={element.label}
                  pattern={element.pattern}
                  helpText={element.helpText}
                  isValid={(valid, name) => {
                    this.setInputValidity(name, valid, checkbox);
                  }}
                  emptyFieldErrorText={element.errorMessage}
                  showErrorMessage={this.props.showErrorMessage}
                  fieldValue={this.state.checkboxValidation[checkbox].fieldValidation[element.name]}
                  value={() => this.fieldValue(checkbox, element.name)}
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

MarketingPreferences.defaultProps = {
  valueFromParent: null,
  showErrorMessage: null,
};
MarketingPreferences.propTypes = {
  getValidation: propTypes.func.isRequired,
  showErrorMessage: propTypes.bool,
  valueFromParent: propTypes.object,
  itemData: propTypes.shape({
    itemData: propTypes.object,
  }).isRequired,
};


export default MarketingPreferences;
