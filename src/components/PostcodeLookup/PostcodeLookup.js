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
      addressDropdownList: [],
      countryDropdownList: [],
      addressLookupData: false,
      postcodeValidationMessage: false,
      form: {
        postcode: undefined,
        address1: undefined,
        town: undefined,
        country: undefined,
        address2: undefined,
        address3: undefined,
      },
      showAddressSelect: false,
      showAddressDetails: false,
      validation: {},
    };
    this.setAddressSelectRef = (element) => {
      this.addressSelectRef = element;
    };
    this.setAddressDetailRef = (element) => {
      this.addressDetailRef = element;
    };
    this.setCountrySelectRef = (element) => {
      this.countrySelectRef = element;
    };

    this.addressLookup = this.addressLookup.bind(this);
    this.showAddressFields = this.showAddressFields.bind(this);
  }

  // TODO: Add shouldComponentUpdate() to prevent children form unnecessarily re-rendering (if that actually works)

  componentWillMount() {
    this.createCountryDropdownList();
  }

  setValidity(name, valid) {
    if (this.state.form[name] === undefined || this.state.form[name] !== valid.value) {
      this.setState((prevState) => {
        return (prevState.form[name] === '' || prevState.form[name] !== valid.value) &&
          {
            form: {
              ...this.state.form,
              [name]: valid.value,
            },
            validation: {
              ...this.state.validation,
              [name]: { ...valid },
            },
          };
      });
    }
    console.log('valid', name, valid, this.state.form[name]);
  }

  /**
   * Fetch addresses from lookup API and update state
   * @return {Promise}
   */
  addressLookup() {
    return fetch(`https://lookups.sls.comicrelief.com/postcode/lookup?query=${this.state.form.postcode}`, {
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
      addresses.push({ label: item.Line1, value: item }));
    this.setState({
      addressDropdownList: addresses,
    });
    // show address select field
    const addressSelect = this.addressSelectRef.selectRef;
    addressSelect.parentElement.classList.remove('visually-hidden');
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
      form: {
        ...this.state.form,
        country: 'GB',
      },
    });
  }

  /**
   * Updates state with new postcode value
   * @param value
   */
  updatePostcode(value) {
    this.setState({
      form: {
        ...this.state.form,
        postcode: value,
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
      const address = JSON.parse(value);
      if (this.state.form.address1 === undefined || this.state.form.address1 !== address.Line1) {
        this.setState({
          form: {
            ...this.state.form,
            address1: address.Line1,
            town: address.posttown,
            country: 'GB',
          },
        });

        this.showAddressFields();
        // change the country back to GB
        this.countrySelectRef.selectRef.selectedIndex = 0;
      }
    }
  }

  showAddressFields() {
    // this.setState({
    //   showAddressDetails: true,
    // });
    this.addressDetailRef.classList.remove('visually-hidden');
  }


  sendStateToParent() {
    // call callback
  }

  // /**
  //  * Update the parent state with required variables
  //  */
  // updateParentState() {
  //   // Update the parent state with form values
  //   this.props.parentStateUpdate(this.state.form);
  //
  //   // Update the validation status of the component to the parent
  //   this.props.validationUpdate(this.state.validation.address1 === true &&
  //     this.state.validation.postcode === true &&
  //     this.state.validation.town);
  // }

  /**
   * AddressLookup render
   * @return {*}
   */
  render() {
    console.log(this.props.burre);
    return (
      <div className="form__row form__row--billing-detail form__row--address-lookup">
        <InputField id="check" type="checkbox" name="name" label="checkbox" required />
        <InputField
          id="postcode"
          type="text"
          name="postcode"
          label="Enter your postcode"
          required
          placeholder="SE1 7TP"
          pattern="[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]?( |)[0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}"
          inlineButton
          buttonValue="FIND ADDRESS"
          emptyFieldErrorText="Please enter your postcode"
          invalidErrorText="Please enter a valid postcode"
          isValid={(valid, name, value) => { this.updatePostcode(value); this.setValidity(name, valid); }}
          buttonClick={() => { return this.addressLookup().then(() => this.state.postcodeValidationMessage); }}
        />
        <SelectField
          ref={this.setAddressSelectRef}
          id="addressSelect"
          name="addressSelect"
          label="Select your address"
          required={false}
          options={this.state.addressDropdownList}
          extraClass={`${this.state.showAddressSelect === false ? 'visually-hidden' : ''}`}
          showErrorMessage={false}
          isValid={(valid, name, value) => { this.updateAddress(value); }}
        />
        <button className="link" onClick={this.showAddressFields}>Or enter your address manually</button>
        <div
          ref={this.setAddressDetailRef}
          id="address-detail"
          className={`form__fieldset form__field--address-detail ${this.state.showAddressDetails === false ? 'visually-hidden' : ''}`}
        >
          <InputField
            id="address1"
            type="text"
            name="address1"
            label="Address line 1"
            required
            value={this.state.form.address1}
            isValid={(valid, name) => { this.setValidity(name, valid); }}
          />
          <InputField
            id="address2"
            type="text"
            name="address2"
            label="Address line 2"
            required={false}
            isValid={(valid, name) => { this.setValidity(name, valid); }}
          />
          <InputField
            id="address3"
            type="text"
            name="address3"
            label="Address line 3"
            required={false}
            isValid={(valid, name) => { this.setValidity(name, valid); }}
          />
          <InputField
            id="town"
            type="text"
            name="town"
            label="Town/City"
            required
            value={this.state.form.town}
            isValid={(valid, name) => { this.setValidity(name, valid); }}
          />
          <SelectField
            ref={this.setCountrySelectRef}
            id="country"
            name="country"
            label="Country"
            required
            options={this.state.countryDropdownList}
            isValid={(valid, name) => { this.setValidity(name, valid); }}
          />
        </div>
      </div>
    );
  }
}

PostcodeLookup.propTypes = {
  burre: propTypes.string.isRequired,

};

export default PostcodeLookup;
