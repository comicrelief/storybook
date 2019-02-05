import React, { Component } from 'react';
import propTypes from 'prop-types';
import InputField from '../InputField/InputField';


class MarketingPreferences extends Component {
  constructor(props) {
    super(props);

    // Create default validation items for the fields
    const items = props.itemData;
    const validation = {};
    items.field.forEach((item) => {
      validation[item.name] = {
        valid: '',
        value: '',
        message: '',
        showErrorMessage: '',
      };
    });

    this.state = {
      marketingPermissionType: null,
      checkedState: null,
      isFieldsHidden: true,
      fields: {},
      validation,
    };
  }

  /**
   * update the state with values coming from the parent
   */
  componentDidMount() {
    this.setInputValue();
  }

  setInputValue() {
    const validation = this.props.valueFromParent !== null ? this.props.valueFromParent : this.state.validation;
    this.setState({
      ...this.state,
      validation,
    });
  }

  /**
   * Update state with value and validity from child and push field validity to parent
   * @param name
   * @param valid
   */
  setInputValidity(name, valid) {
    if ((this.state.validation[name].value === undefined || this.state.validation[name].value !== valid.value) ||
      (this.state.validation[name].message !== valid.message)) {
      this.setState({
        ...this.state,
        validation: {
          ...this.state.validation,
          [name]: {
            valid: valid.valid,
            value: valid.value,
            message: valid.message,
            showErrorMessage: valid.showErrorMessage,
          },
        },
      }, this.pushValidityToParent);
    }
  }

  /**
   * return the value from the state. Needed to make the field mutable again.
   * @param name
   * @return {{}}
   */
  fieldValue(name) {
    let value = this.state.validation;
    if (value[name] !== undefined) {
      value = value[name];
    }
    return value;
  }

  /**
   * The handler enables the user to uncheck and check the checkbox
   * which reveals the previously hidden input field according
   * to their selection.
   */
  handleCheckboxToggle(element, event) {
    const value = event.target.value;

    this.setState(prevState => ({
      marketingPermissionType: element.name,
      checkedState: prevState.checkedState !== value ? value : null,
      isFieldsHidden: element.hideFields,
    }));

    this.props.getCheckboxValue(element.name, value);

    if (element.hideFields === false) {
      this.pushValidityToParent();
    }
  }

  pushValidityToParent() {
    this.props.getFieldInputValidation(this.state.validation);
  }


  render() {
    const item = this.props.itemData;
    const bgStyle = 'form__field--background';
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
                  onChange={e => this.handleCheckboxToggle(element, e)}
                  checked={this.state.checkedState === element.value}
                  ariarole="checkbox"
                  aria-label={`field-label--${element.label}`}
                  aria-checked={this.state.checkedState === element.value}
                />
                <span />
              </div>
            ))
          }
        </div>
        { !this.state.isFieldsHidden &&
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
                    this.setInputValidity(name, valid);
                  }}
                  emptyFieldErrorText={element.errorMessage}
                  showErrorMessage={this.props.showErrorMessage}
                  fieldValue={this.props.valueFromParent && this.props.valueFromParent[element.name]}
                  value={() => this.fieldValue(element.name)}
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
  getCheckboxValue: () => {},
  valueFromParent: null,
  showErrorMessage: null,
};
MarketingPreferences.propTypes = {
  getFieldInputValidation: propTypes.func.isRequired,
  showErrorMessage: propTypes.bool,
  getCheckboxValue: propTypes.func,
  valueFromParent: propTypes.object,
  itemData: propTypes.shape({
    itemData: propTypes.object,
  }).isRequired,
};


export default MarketingPreferences;
