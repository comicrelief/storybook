import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import browser from 'browser-detect';
import SelectField from '../SelectField/SelectField';
import InputField from '../InputField/InputField';
import countries from './countries.json';
import { defaultPostcodeValidation, fallbackPostcodeValidation } from './postcodeValidations';

class PostcodeLookup extends Component {
  /**
   * PostcodeLookup constructor
   */
  constructor(props) {
    super(props);
    this.timeoutDuration = 10000;
    this.defaultCountry = 'GB';
    this.state = {
      // Initially set using the postcodeValidation prop (be it default or overridden)
      currentPostcodeValidation: props.postcodeValidation[this.defaultCountry],
      postcodeTest: false,
      addressDropdownList: [],
      countryDropdownList: [],
      postcodeValidationMessage: false,
      showErrorMessages: false,
      previousAddress: '',
      isAddressButtonHidden: false,
      isAddressSelectHidden: true,
      isAddressFieldsHidden: true,
      validation: props.valuesFromParent !== null && typeof props.valuesFromParent !== 'undefined' ? props.valuesFromParent : {
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
    this.reRenderKey = 0;
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
    this.showAddressFields = this.showAddressFields.bind(this);
  }

  componentWillMount() {
    this.setInputValue();
    this.createCountryDropdownList();

    if (this.props.forceManualInput === true) {
      this.setState({
        isAddressSelectHidden: true,
        isAddressFieldsHidden: false,
        isAddressButtonHidden: true,
      });
    }
  }

  componentDidMount() {
    this.setInputValue();
  }

  /**
   * If parent wants to show error messages, update errorMessages state
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    const state = this.state;
    state.showErrorMessages = nextProps.showErrorMessages === true;

    if (nextProps.forceManualInput === true) {
      state.isAddressSelectHidden = true;
      state.isAddressFieldsHidden = false;
      state.isAddressButtonHidden = true;
    }
    this.setState(state);
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
   * @param fieldName
   * @param fieldValidityObj
   */
  setValidity(fieldName, fieldValidityObj) {
    if ((this.state.validation[fieldName].value === undefined || this.state.validation[fieldName].value !== fieldValidityObj.value) ||
      (this.state.validation[fieldName].message !== fieldValidityObj.message)) {
      // Only revalidate the postcode when the country has changed value
      const revalidatePostcode = fieldName === 'country' && fieldValidityObj !== this.state.validation.country.value;

      this.setState({
        ...this.state,
        fieldRefs: this.fieldRefs,
        // Only update the regex state when necessary
        ...(revalidatePostcode && {
          // If there's no specific regex pattern for this country code, use the fallback pattern
          currentPostcodeValidation: this.props.postcodeValidation[fieldValidityObj.value] || fallbackPostcodeValidation,
        }),
        validation: {
          ...this.state.validation,
          [fieldName]: {
            valid: fieldValidityObj.valid,
            value: fieldValidityObj.value,
            message: fieldValidityObj.message,
            showErrorMessage: fieldValidityObj.showErrorMessage,
          },
        },
      });

      // Force a revalidation of the postcode if the country (and therefore the regex) has changed
      if (revalidatePostcode) {
        this.revalidatePostcode();
      }
    }
  }

  /**
   * Set the input values
   */
  setInputValue() {
    const validation = this.props.valuesFromParent !== null ? this.props.valuesFromParent : this.state.validation;
    this.setState({
      ...this.state,
      validation,
      isAddressFieldsHidden: this.state.isAddressFieldsHidden === true && validation.address1.value === '' && this.props.forceManualInput === false,
    });
  }

  /**
  * Crummy workaround to trigger a revalidation
  */
  revalidatePostcode() {
    // Store the current postcode to re-add
    const postcodeField = document.getElementById('field-input--postcode');
    const currentPostcodeValue = postcodeField.value;
    const blurEvent = new Event('blur', { bubbles: true });

    // Temporarily reset the postcode field and programmatically
    // trigger a blur event to make the validation take notice
    postcodeField.value = '';
    postcodeField.dispatchEvent(blurEvent);

    setTimeout(() => {
      // Immediately re-add the value and trigger another blur event
      postcodeField.value = currentPostcodeValue;
      postcodeField.dispatchEvent(blurEvent);
    }, 1);
  }


  /**
   * Get addresses from lookup API and update state
   * @return {Promise}
   */
  addressLookup() {
    // To allow us to cancel the GET...
    const source = axios.CancelToken.source();

    // ... after the specified duration (falling back to manual
    // entry), to prevent users hanging around without any feedback
    const thisTimer = setTimeout(() => {
      source.cancel();
    }, this.timeoutDuration);

    return axios.get(this.props.plusURL + this.state.validation.postcode.value, { cancelToken: source.token })
      .then((response) => {
        if (response.status !== 200) {
          throw Error();
        }
        // Clear up the timer on success
        clearTimeout(thisTimer);
        return response.data;
      })
      .then((response) => {
        if (response.addresses !== null && response.addresses.length >= 1) {
          this.setState({
            postcodeValidationMessage: false,
          });
          this.createAddressDropdownList(response.addresses);
        } else {
          // As to not 100% override this response, let's just customise the error for this specific case:
          const validationMsg = response.message.includes('Search string is not a valid postcode:')
            ? 'Please enter a valid UK postcode to find your address'
            : response.message;
          this.setState({
            postcodeValidationMessage: validationMsg
            ,
          });
        }
      })
      .catch(() => {
        this.setState({
          postcodeValidationMessage: 'Postcode lookup currently unavailable, please enter your address manually',
          isAddressFieldsHidden: false,
        });
      });
  }

  /**
   * Creates object for address select field options.
   * Updates state with new address object and shows address select field
   */
  createAddressDropdownList(addressData) {
    const addresses = [{ label: 'Please select', value: null }];

    if (addressData) {
      addressData.map(item =>
        addresses.push({ label: typeof item.Line2 === 'undefined' ? item.Line1 : `${item.Line1}, ${item.Line2}`,
          value: item }));
      this.setState({
        addressDropdownList: addresses,
        isAddressSelectHidden: false,
      });
    }
  }


  /**
   * Creates object for country select field options from json file.
   * Updates state with new country object.
   */
  createCountryDropdownList() {
    let value = this.defaultCountry;
    let dropDownList = [];
    if (this.props.valuesFromParent !== null) {
      const isGBSelected = this.props.valuesFromParent.country.value === '' || this.props.valuesFromParent.country.value === 'GB';
      dropDownList = [
        { label: 'United Kingdom', value: 'GB', selected: isGBSelected },
        { label: '-------------------', disabled: true },
      ];
      Object.keys(countries).forEach((key) => {
        const isOtherCountrySelected= this.props.valuesFromParent !== null && this.props.valuesFromParent.country.value &&
          this.props.valuesFromParent.country.value === key;
        dropDownList.push({ label: countries[key], value: key, selected: isOtherCountrySelected });
      });
      value = this.props.valuesFromParent.country.value;
    } else {
      dropDownList = [
        { label: 'United Kingdom', value: 'GB', selected: true },
        { label: '-------------------', disabled: true },
      ];
      Object.keys(countries).forEach((key) => {
        dropDownList.push({ label: countries[key], value: key });
      });
    }

    this.setState({
      countryDropdownList: dropDownList,
      validation: {
        ...this.state.validation,
        country: {
          valid: true,
          message: '',
          value,
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
      if (this.state.showErrorMessages === true) {
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
          isAddressFieldsHidden: false,
        });
        // change the country back to GB
        if (this.country !== undefined) {
          this.country.selectedIndex = 0;
        }
        // Allows us to force re-render of the InputFields using defautlValue
        this.reRenderKey = Math.random();
      }
    }
  }

  /**
   * Show the address fields
   * @param e
   */
  showAddressFields(e) {
    e.preventDefault();
    this.setState({
      isAddressFieldsHidden: false,
    });
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

  /**
   * Return postcode validation
   * @return {*}
   */
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
    const isBrowser = browser();
    const postCodeField = {
      id: 'postcode',
      type: 'text',
      placeholder: this.props.placeholder,
      buttonText: this.props.buttonText,
      pattern: this.state.currentPostcodeValidation.pattern,
      // As the error msg will depend on exactly what the regex is asking for, it comes via the associated validation object
      invalidErrorText: this.state.currentPostcodeValidation.errorMsg,
      emptyFieldErrorText: 'Please enter your postcode',
      extraClass: 'search-box',
      autoComplete: isBrowser.name === 'chrome' ? 'new-postcode' : 'off',
    };
    const addressPattern = /^[A-Za-z0-9]+[ _.'/&\w-]*$/;
    const addressErrorMessage = 'This field only accepts alphanumeric characters and \' . - & _ /';
    const addressOutputFields = [
      { id: 'address1', type: 'text', label: 'Address line 1', required: true, pattern: addressPattern, invalidErrorText: addressErrorMessage },
      { id: 'address2', type: 'text', label: 'Address line 2', required: false, pattern: addressPattern, invalidErrorText: addressErrorMessage },
      { id: 'address3', type: 'text', label: 'Address line 3', required: false, pattern: addressPattern, invalidErrorText: addressErrorMessage },
      { id: 'town', type: 'text', label: 'Town/City', required: true, pattern: addressPattern, invalidErrorText: addressErrorMessage },
    ];
    const supportedAriaAttributes = isBrowser.name === 'firefox' && isBrowser.os.match('Windows') ?
      { 'aria-live': 'assertive', 'aria-relevant': 'additions removals' } : { 'aria-live': 'assertive', role: 'status' };

    const hasError = this.state.valid === false || (this.props.showErrorMessage === true && this.state.message !== '');
    const hasErrorTwo = this.state.isAddressSelectHidden === true && this.state.isAddressFieldsHidden === true && this.props.showErrorMessages === true;
    const hasErrorThree = this.state.isAddressFieldsHidden === true && this.state.isAddressSelectHidden === false && this.props.showErrorMessages === true;
    const hasErrorClass = hasError || hasErrorTwo || hasErrorThree ? 'form__field--erroring' : '';

    const addressButtonHidden = this.state.isAddressButtonHidden;

    return (
      <div className={`form__row form__row--billing-detail form__row--address-lookup ${hasErrorClass}`} >
        <InputField
          ref={this.setRefs}
          id={postCodeField.id}
          type={postCodeField.type}
          name={postCodeField.id}
          label={this.props.label}
          required
          autoComplete={postCodeField.autoComplete}
          placeholder={postCodeField.placeholder}
          pattern={postCodeField.pattern}
          extraClass={postCodeField.extraClass}
          inlineButton={addressButtonHidden === false}
          buttonValue={postCodeField.buttonText}
          emptyFieldErrorText={postCodeField.emptyFieldErrorText}
          invalidErrorText={postCodeField.invalidErrorText}
          value={id => this.addressValue(id)}
          fieldValue={this.props.valuesFromParent}
          isValid={(valid, name) => { this.setValidity(name, valid); }}
          buttonClick={() => { return this.addressLookup().then(() => this.returnPostcodeValidation()); }}
          showErrorMessage={this.state.showErrorMessages}
        />
        { this.state.isAddressSelectHidden === false &&
        <SelectField
          ref={this.setRefs}
          id="addressSelect"
          name="addressSelect"
          label="Select your address"
          required
          options={this.state.addressDropdownList}
          extraClass={this.state.addressSelectClass}
          showErrorMessage={this.state.showErrorMessages}
          isValid={(valid, name, value) => { this.updateAddress(value); }}
        />
        }
        { hasErrorThree &&
        <div id="field-error--addressSelect" className="form__field-error-container" ref={this.setRefs} {...supportedAriaAttributes} >
          <span className="form-error">Please select your address</span>
        </div>
        }
        {this.state.isAddressButtonHidden === false &&
          <div className="form__field--wrapper">
            <a href="#" role="button" className="link" onClick={e => this.showAddressFields(e)} aria-describedby="field-error--addressDetails">Or enter your address manually</a>
          </div>
        }
        <div
          ref={this.setAddressDetailRef}
          id="address-detail"
          className="form__field--address-detail"
        >
          { hasErrorTwo &&
          <div id="field-error--addressDetails" className="form__field-error-container" ref={this.setRefs} {...supportedAriaAttributes}>
            <span className="form-error">Please fill in your address</span>
          </div>
          }
          <div className={this.state.isAddressFieldsHidden === false ? '' : 'hide'}>
            {addressOutputFields.map(item => (
              <InputField
                key={item.id}
                ref={this.setRefs}
                id={item.id}
                type={item.type}
                name={item.id}
                label={item.label}
                required={item.required}
                autoComplete={item.autoComplete}
                value={id => this.addressValue(id)}
                pattern={item.pattern}
                invalidErrorText={item.invalidErrorText}
                showErrorMessage={this.state.showErrorMessages}
                fieldValue={this.props.valuesFromParent}
                isValid={(valid, name) => { this.setValidity(name, valid); }}
                reRenderKey={this.reRenderKey}
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
      </div>
    );
  }
}

PostcodeLookup.defaultProps = {
  isAddressValid: null,
  label: 'Postcode',
  showErrorMessages: false,
  valuesFromParent: null,
  forceManualInput: false,
  plusURL: 'https://lookups.sls.comicrelief.com/postcode/lookup?query=',
  buttonText: 'FIND UK ADDRESS',
  placeholder: 'SE1 7TP',
  postcodeValidation: defaultPostcodeValidation,
};

PostcodeLookup.propTypes = {
  valuesFromParent: propTypes.object,
  isAddressValid: propTypes.func,
  label: propTypes.string,
  showErrorMessages: propTypes.bool,
  forceManualInput: propTypes.bool,
  plusURL: propTypes.string,
  buttonText: propTypes.string,
  placeholder: propTypes.string,
  // An optional prop to allow contexts to override them;
  // see postcodeValidations.js for reference
  postcodeValidation: propTypes.object,
};

export default PostcodeLookup;
