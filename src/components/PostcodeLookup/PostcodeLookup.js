/* eslint-disable max-len */
/* eslint-env browser */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import SelectField from '../SelectField/SelectField';
import InputField from '../InputField/InputField';
import countries from './countries.json';


class PostcodeLookup extends Component {
  /**
   * AddressLookup constructor
   */
  constructor() {
    super();
    this.state = {
      form: {},
      addressDropdownList: [],
      countryDropdownList: [],
      addressLookupData: false,
      postcodeValidationMessage: false,
      showErrorMessages: false,
      previousAddress: '',
      addressSelectClass: 'visually-hidden',
      validation: {
        postcode: {
          valid: null,
          message: '',
          value: '',
        },
        address1: {
          valid: null,
          message: '',
          value: '',
        },
        address2: {
          valid: true,
          message: '',
          value: '',
        },
        address3: {
          valid: true,
          message: '',
          value: '',
        },
        town: {
          valid: null,
          message: '',
          value: '',
        },
        country: {
          valid: null,
          message: '',
          value: '',
        },
      },
    };
    this.setAddressDetailRef = (element) => {
      this.addressDetailRef = element;
    };
    const refs = [];
    this.setRefs = (element) => {
      if (element) {
        if (element.inputRef) {
          refs.push(element.inputRef);
        }
        if (element.selectRef) {
          refs.push(element.selectRef);
          this[element.props.id] = element.selectRef;
        }
        this.fieldRefs = refs;
      }
    };

    this.addressLookup = this.addressLookup.bind(this);
    this.showAddressFields = this.showAddressFields.bind(this);
  }

  componentWillMount() {
    this.createCountryDropdownList();
    this.setInputValue();
  }

  componentDidMount() {
    this.setValidValue();
  }

  /**
   * If parent wants to show error messages, update errorMessages state
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.showErrorMessages && nextProps.showErrorMessages !== this.state.showErrorMessages) {
      this.setState({
        ...this.state,
        showErrorMessages: nextProps.showErrorMessages,
      });
      if (nextProps.showErrorMessages === true) {
        this.removeClassName(this.addressDetailRef, 'visually-hidden');
      }
    }
  }

  /**
   * Send validation to Parent
   */
  componentDidUpdate() {
    if (typeof this.props.isAddressValid === 'function') {
      this.props.isAddressValid(this.state.validation);
    }
  }

  /**
   * Update state with value and validity from child
   * @param name
   * @param valid
   */
  setValidity(name, valid) {
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
          },
        },
      });
    }
  }

  /**
   * Sets and store the input value entered for multi-step form
   */
  setInputValue() {
    const form = this.props.form;
    if (form !== null) {
      this.setState({
        form: {
          ...form,
          postcode: typeof form.postcode === 'undefined' ? '' : form.postcode,
          address1: typeof form.address1 === 'undefined' ? '' : form.address1,
          address2: typeof form.address2 === 'undefined' ? '' : form.address2,
          address3: typeof form.address3 === 'undefined' ? '' : form.address3,
          town: typeof form.town === 'undefined' ? '' : form.town,
        },
      });
    }
  }

  /**
   *  Re-set the valid state and value of validation object
   *  from parent object in a multi-step form.
   */
  setValidValue() {
    const validation = this.state.validation;
    const form = this.props.form;
    if (form !== null) {
      if (form.postcode !== '' && form.address1 !== '' && form.town !== '') {
        this.showAddressFields();
        this.setState({
          validation: {
            ...validation,
            postcode: {
              valid: form.postcode !== '' ? true : null,
              value: form.postcode,
              message: '',
            },
            address1: {
              valid: form.address1 !== '' ? true : null,
              value: form.address1,
              message: '',
            },
            address2: {
              valid: true,
              value: form.address2,
              message: '',
            },
            address3: {
              valid: true,
              value: form.address3,
              message: '',
            },
            town: {
              valid: form.town !== '' ? true : null,
              value: form.town,
              message: '',
            },
          },
        });
      }
    }
  }

  /**
   * Fetch addresses from lookup API and update state
   * @return {Promise}
   */
  addressLookup() {
    return fetch(`https://lookups.sls.comicrelief.com/postcode/lookup?query=${this.state.validation.postcode.value}`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then((response) => {
        if (response.addresses !== null && response.addresses.length >= 1) {
          this.setState({
            postcodeValidationMessage: false,
            addressLookupData: response.addresses,
          });
          this.createAddressDropdownList();
        } else {
          this.setState({
            postcodeValidationMessage: response.message,
          });
        }
      });
  }

  /**
   * Creates object for address select field options.
   * Updates state with new address object and shows address select field
   */
  createAddressDropdownList() {
    const addresses = [{ label: 'Please select', value: null }];
    this.state.addressLookupData.map(item =>
      addresses.push({ label: typeof item.Line2 === 'undefined' ? item.Line1 : `${item.Line1}, ${item.Line2}`,
        value: item }));
    this.setState({
      addressDropdownList: addresses,
      addressSelectClass: '',
    });
  }


  /**
   * Creates object for country select field options from json file.
   * Updates state with new country object.
   */
  createCountryDropdownList() {
    const dropDownList = [
      { label: 'United Kingdom', value: 'GB', selected: true },
      { label: '-------------------', disabled: true },
    ];
    Object.keys(countries).map(key =>
      dropDownList.push({ label: countries[key], value: key }),
    );
    this.setState({
      countryDropdownList: dropDownList,
      validation: {
        ...this.state.validation,
        country: {
          valid: true,
          message: '',
          value: 'GB',
        },
      },
    });
  }

  /**
   * Updates state with selected address values
   * Shows address detail fields
   * Changes country select field back to GB
   * @param value
   */
  updateAddress(value) {
    if (value.length >= 1) {
      if(this.state.showErrorMessages === true) {
        this.setState({
          showErrorMessages: false,
        });
      }
      const address = JSON.parse(value);
      if (address && (this.state.previousAddress === undefined || this.state.previousAddress !== address.Line1)) {
        this.setState({
          previousAddress: address.Line1,
          validation: {
            ...this.state.validation,
            postcode: {
              valid: true,
              value: address.postcode,
              message: '',
            },
            address1: {
              valid: true,
              value: address.Line1,
              message: '',
            },
            address2: {
              valid: true,
              value: !address.Line2 ? '' : address.Line2,
              message: '',
            },
            address3: {
              valid: true,
              value: !address.Line3 ? '' : address.Line3,
              message: '',
            },
            town: {
              valid: true,
              value: address.posttown,
              message: '',
            },
            country: {
              valid: true,
              value: 'GB',
              message: '',
            },
          },
        });
        this.showAddressFields();
        // change the country back to GB
        this.country.selectedIndex = 0;
      }
    }
  }

  showAddressFields(e) {
    if (e !== undefined) {
      e.preventDefault();
    }
    this.removeClassName(this.addressDetailRef, 'visually-hidden');
  }

  /**
   * Removes class name from element
   * Works in IE9
   * @param element
   * @param className
   */
  removeClassName(ref, className) {
    const element = ref;
    const classes = element.getAttribute('class').split(' ');
    const i = classes.indexOf(className);
    classes.splice(i, 1);
    element.className = classes;
  }

  /**
   * Gets validation info from state and returns it to child
   * Everything works fine for the Town field, but not for Address1 :/
   * @param id
   * @return {*}
   */
  addressValue(id) {
    let value = this.state.validation;
    if (value[id] !== undefined) {
      value = value[id];
    }
    return value;
  }
  returnPostcodeValidation() {
    return this.state.postcodeValidationMessage !== false ? {
      message: this.state.postcodeValidationMessage,
      valid: false,
      showErrorMessage: true,
    } : '';
  }

  /**
   * AddressLookup render
   * @return {*}
   */
  render() {
    const postCodeField = {
      id: 'postcode',
      type: 'text',
      placeholder: 'SE1 7TP',
      buttonText: 'FIND ADDRESS',
      pattern: '[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]?( |)[0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}',
      invalidErrorText: 'Please enter a valid postcode',
      emptyFieldErrorText: 'Please enter your postcode',
      extraClass: 'search-box',
    };

    const addressOuptutFields = [
      { id: 'address1', type: 'text', label: 'Address line 1', required: true },
      { id: 'address2', type: 'text', label: 'Address line 2', required: false },
      { id: 'address3', type: 'text', label: 'Address line 3', required: false },
      { id: 'town', type: 'text', label: 'Town/City', required: true },
    ];
    return (
      <div className="form__row form__row--billing-detail form__row--address-lookup">
        <InputField
          ref={this.setRefs}
          id={postCodeField.id}
          type={postCodeField.type}
          name={postCodeField.id}
          label={this.props.label}
          required
          placeholder={postCodeField.placeholder}
          pattern={postCodeField.pattern}
          extraClass={postCodeField.extraClass}
          inlineButton
          buttonValue={postCodeField.buttonText}
          emptyFieldErrorText={postCodeField.emptyFieldErrorText}
          invalidErrorText={postCodeField.invalidErrorText}
          value={id => this.addressValue(id)}
          fieldValue={this.state.form[postCodeField.id]}
          isValid={(valid, name) => { this.setValidity(name, valid); }}
          buttonClick={() => { return this.addressLookup().then(() => this.returnPostcodeValidation()); }}
          showErrorMessage={this.state.showErrorMessages}
        />
        <SelectField
          ref={this.setRefs}
          id="addressSelect"
          name="addressSelect"
          label="Select your address"
          required={false}
          options={this.state.addressDropdownList}
          extraClass={this.state.addressSelectClass}
          showErrorMessage={this.state.showErrorMessages}
          isValid={(valid, name, value) => { this.updateAddress(value); }}
        />
        <div className="form__field--wrapper">
          <a href="" role="button" className="link" onClick={e => this.showAddressFields(e)}>Or enter your address manually</a>
        </div>
        <div
          ref={this.setAddressDetailRef}
          id="address-detail"
          className="form__fieldset form__field--address-detail visually-hidden"
        >
          {
            addressOuptutFields.map(item => (
              <InputField
                key={item.id}
                ref={this.setRefs}
                id={item.id}
                type={item.type}
                name={item.id}
                label={item.label}
                required={item.required}
                value={id => this.addressValue(id)}
                showErrorMessage={this.state.showErrorMessages}
                isValid={(valid, name) => { this.setValidity(name, valid); }}
                fieldValue={this.state.form[item.id]}
              />
            ))
          }
          <SelectField
            ref={this.setRefs}
            id="country"
            name="country"
            label="Country"
            required
            options={this.state.countryDropdownList}
            value={() => this.state.validation.country.value}
            showErrorMessage={this.state.showErrorMessages}
            isValid={(valid, name) => { this.setValidity(name, valid); }}
          />
        </div>
      </div>
    );
  }
}


PostcodeLookup.defaultProps = {
  isAddressValid: null,
  label: 'Postcode',
  showErrorMessages: false,
  form: null,
};
PostcodeLookup.propTypes = {
  form: propTypes.oneOfType([
    propTypes.string,
    propTypes.number,
    propTypes.object,
  ]),
  isAddressValid: propTypes.func,
  label: propTypes.string,
  showErrorMessages: propTypes.bool,
};

export default PostcodeLookup;
