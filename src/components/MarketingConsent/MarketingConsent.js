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
      isHidden: true,
      isTicked: false,
      marketingPermissionType: null,
      checkedState: null,
      fields: {},
      validation,
      formValues: {},
    };
  }

  /**
   * Set input validity on change
   * @param valid
   * @param name
   */
  setInputValidity(valid, name) {
    console.log('set input validity');
    if ((this.state.validation[name].value === undefined || this.state.validation[name].value !== valid.value) ||
      (this.state.validation[name].message !== valid.message)) {
      this.setState({
        ...this.state,
        fieldRefs: this.fieldRefs,
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
   * The handler enables the user to uncheck and check the checkbox
   * which reveals the appropriate previously hidden input field according
   * to their selection.
   */
  handleCheckboxToggle(name, event) {
    const item = this.props.itemData;
    // console.log('showfields=false', event.target.getAttribute('data-show-fields'), event.target);
    console.log('name:', name, 'event:', event.target.value, 'checked? ', event.target.checked);
    if (event.target.checked) {
      this.setState({
        marketingPermissionType: name,
        checkedState: this.state[name] = event.target.value,
        isHidden: event.target.value !== 'yes',
        isTicked: event.target.checked,
      });
    }


    if (!event.target.checked) {
      this.setState(prevState => ({
        marketingPermissionType: name,
        checkedState: this.state[name] = !prevState.checkedState,
        isHidden: !prevState.isHidden,
        isTicked: !prevState.isTicked,
      }));
    }
    this.props.getCheckboxValue(item.text, event.target.value);

    this.pushValidityToParent();
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
                  onChange={e => this.handleCheckboxToggle(element.name, e)}
                  checked={this.state[element.name] === element.value}
                  ariarole="checkbox"
                  aria-label={`field-label--${element.label}`}
                  aria-checked={this.state.isTicked}
                  // data-show-fields={element.showFields}
                />
                <span />
              </div>
            ))
          }
        </div>
        { !this.state.isHidden &&
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
                  isValid={(e, name, value) => {
                    this.setInputValidity(e, name, this.props.formValues(name, value));
                  }}
                  emptyFieldErrorText={element.errorMessage}
                  showErrorMessage={this.props.showErrorMessage}
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
  formValues: () => {},
  showErrorMessage: null,
};
MarketingPreferences.propTypes = {
  getFieldInputValidation: propTypes.func.isRequired,
  showErrorMessage: propTypes.bool,
  getCheckboxValue: propTypes.func,
  formValues: propTypes.func,
  itemData: propTypes.shape({
    itemData: propTypes.object,
  }).isRequired,
};


export default MarketingPreferences;
