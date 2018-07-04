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
      previousAddress: '',
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

  componentWillMount() {
    this.createCountryDropdownList();
  }

  /**
   * Update state with value and validity from child
   * @param name
   * @param valid
   */
  setValidity(name, valid) {
    if (this.state.form[name] === undefined || this.state.form[name] !== valid.value) {
      this.setState({
        form: {
          ...this.state.form,
          [name]: valid.value,
        },
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
  // updateAddress(value) {
  //   if (value.length >= 1) {
  //     const address = JSON.parse(value);
  //     if (this.state.form.address1 === undefined || this.state.form.address1 !== address.Line1) {
  //       this.setState({
  //         form: {
  //           ...this.state.form,
  //           address1: address.Line1,
  //         },
  //         validation: {
  //           ...this.state.validation,
  //           address1: {
  //             valid: true,
  //             value: address.Line1,
  //             message: '',
  //           },
  //         },
  //       });
  //     }
  //     if (this.state.form.address2 === undefined || this.state.form.address2 !== address.Line2) {
  //       this.setState({
  //         form: {
  //           ...this.state.form,
  //           address2: address.Line2,
  //         },
  //         validation: {
  //           ...this.state.validation,
  //           address2: {
  //             valid: true,
  //             value: address.Line2,
  //             message: '',
  //           },
  //         },
  //       });
  //     }
  //     this.showAddressFields();
  //     // change the country back to GB
  //     this.countrySelectRef.selectRef.selectedIndex = 0;
  //   }
  // }

  updateAddress(value) {
    if (value.length >= 1) {
      const address = JSON.parse(value);
      console.log('ADDRESS=', address, 'line', address.Line2);
      console.log('state form address1', this.state.form.address1, 'api address line 1', address.Line1);
      if (this.state.previousAddress === undefined || this.state.previousAddress !== address.Line1) {
        this.setState({
          previousAddress: address.Line1,
          form: {
            ...this.state.form,
            address1: address.Line1,
            address2: '',
            town: address.posttown,
            country: 'GB',
          },
          validation: {
            ...this.state.validation,
            address1: {
              valid: true,
              value: address.Line1,
              message: '',
            },
            address2: {
              valid: true,
              value: address.Line2 !== undefined ? address.Line2 : '',
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
        // this.countrySelectRef.selectRef.selectedIndex = 0;
      }
    }
  }


  showAddressFields() {
    this.addressDetailRef.classList.remove('visually-hidden');
  }

  // Todo: fix address1
  /**
   * Gets validation info from state and returns it to child
   * Everything works fine for the Town field, but not for Address1 :/
   * @param id
   * @return {*}
   */
  addressValue(id) {
    const value = this.state.validation;
    if (value[id] !== undefined) {
      // console.log('addressValue = ', value[id]);
      return value[id];
    }
  }

  sendStateToParent() {
    // component needs prop for callback function to deal with this
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
          showErrorMessage={false}
        />
        <SelectField
          ref={this.setAddressSelectRef}
          id="addressSelect"
          name="addressSelect"
          label="Select your address"
          required={false}
          options={this.state.addressDropdownList}
          extraClass="visually-hidden"
          showErrorMessage={false}
          isValid={(valid, name, value) => { this.updateAddress(value); }}
        />
        <button className="link" onClick={this.showAddressFields}>Or enter your address manually</button>
        <div
          ref={this.setAddressDetailRef}
          id="address-detail"
          className="form__fieldset form__field--address-detail visually-hidden"
        >
          <InputField
            id="address1"
            type="text"
            name="address1"
            label="Address line 1"
            required
            value={id => this.addressValue(id)}
            isValid={(valid, name) => { this.setValidity(name, valid); }}
          />
          <InputField
            id="address2"
            type="text"
            name="address2"
            label="Address line 2"
            value={id => this.addressValue(id)}
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
            value={id => this.addressValue(id)}
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

// TODO update props
PostcodeLookup.propTypes = {
  burre: propTypes.string.isRequired,

};

export default PostcodeLookup;
