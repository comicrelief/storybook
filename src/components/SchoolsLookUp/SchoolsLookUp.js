import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import './SchoolsLookUp.scss';

const SHOW_EDCO_LOOKUP = 'SHOW_EDCO_LOOKUP';
const SHOW_MANUAL_LOOKUP = 'SHOW_MANUAL_LOOKUP';
const HIDE_LOOKUP = 'HIDE_LOOKUP';

class SchoolsLookUp extends Component {
  /**
   * Render menu item children.
   * @param option
   * @return {XML}
   */
  static renderMenuItemChildren(option) {
    return (
      <div key={option.id}>
        <span>{option.name}, </span>
        <span>{option.post_code}</span>
      </div>
    );
  }

  /**
   * SchoolsLookUp constructor.
   * @param {object} props
   */
  constructor(props) {
    super(props);
    const { selectedEstablishment, establishmentNameValue } = props;
    let lookup;
    if (selectedEstablishment && selectedEstablishment.id) {
      lookup = HIDE_LOOKUP;
    } else if (establishmentNameValue) {
      lookup = SHOW_MANUAL_LOOKUP;
    } else {
      lookup = SHOW_EDCO_LOOKUP;
    }
    this.state = {
      options: [],
      lookup,
    };
    this.renderMenuItemChildren = SchoolsLookUp.renderMenuItemChildren;
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleLookup = this.handleLookup.bind(this);
    this.handleManual = this.handleManual.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.renderSingleInput = this.renderSingleInput.bind(this);
    this.renderEstablishmentDetails = this.renderEstablishmentDetails.bind(this);
  }

  /**
   * Handle click event.
   * @param {string} lookup
   * @param {object} event
   */
  handleLookup(lookup, event) {
    event.preventDefault();
    this.setState({ lookup });
  }

  /**
   * Handle search event.
   * @param {string} query
   */
  handleSearch(query) {
    if (!query) {
      return;
    }
    axios.get(this.props.data + query)
      .then((response) => {
        const options = response.data.data.schools;
        this.setState({ options });
      });
  }

  /**
   * Handle change event.
   * @param data
   */
  handleChange(data) {
    if (!data || !data[0]) {
      return;
    }
    const {
      selectedEstablishmentIdentifier,
      establishmentIdIdentifier,
      establishmentNameIdentifier,
      address1Identifier,
      townIdentifier,
      countyIdentifier,
      postCodeIdentifier,
      countryIdentifier,
      onChange,
    } = this.props;
    const selectedEstablishment = data[0];
    onChange(selectedEstablishmentIdentifier, { target: { value: selectedEstablishment } });
    const mappedData = {
      [establishmentIdIdentifier]: selectedEstablishment.id,
      [establishmentNameIdentifier]: selectedEstablishment.name,
      [address1Identifier]: selectedEstablishment.address_1,
      [townIdentifier]: selectedEstablishment.town,
      [countyIdentifier]: selectedEstablishment.county,
      [postCodeIdentifier]: selectedEstablishment.post_code,
      [countryIdentifier]: selectedEstablishment.country,
    };
    Object.keys(mappedData).forEach((identifier) => {
      onChange(identifier, { target: { value: mappedData[identifier] } });
    });
    // display selection and reset fetched schools
    this.setState({ lookup: HIDE_LOOKUP, options: [] });
  }

  /**
   * Handle change event.
   * @param {object} event
   * @param {string} identifier
   */
  handleManual(identifier, event) {
    const { onChange, establishmentIdIdentifier,
      establishmentIdValue, selectedEstablishmentIdentifier } = this.props;
    // reset selected school on manual entry
    if (establishmentIdValue) {
      onChange(establishmentIdIdentifier, { target: { value: '' } });
      onChange(selectedEstablishmentIdentifier, { target: { value: {} } });
    }
    onChange(identifier, event);
  }

  /**
   * Handle blur event.
   * @param {string} identifier
   */
  handleBlur(identifier) {
    const {
      validateField,
    } = this.props;
    if (validateField) {
      validateField(identifier);
    }
  }

  /**
   * Render single input
   * @param {string} labelText
   * @param {string} identifier
   * @param {string} value
   * @param {string} errorMessage
   * @param {boolean} readOnly
   * @return {XML}
   */
  renderSingleInput(labelText, identifier, value, errorMessage, readOnly) {
    // avoid rendering read only with empty value
    if (readOnly === true && !value) {
      return null;
    }
    return (
      <div className={`${readOnly === false && errorMessage ? 'validation__wrapper': ''}`}>
        {readOnly === false ?
          <div>
            <label htmlFor={identifier} className="required">{labelText}</label>
            <input
              id={identifier}
              name={identifier}
              value={value}
              type="text"
              onChange={event => this.handleManual(identifier, event)}
              onBlur={event => this.handleBlur(identifier, event)}
              required
            />
            {errorMessage ?
              <div className="validation__message">
                <span>
                  {errorMessage}
                </span>
              </div>:
              null
            }
          </div>:
          <p>{labelText}: {value}</p>
        }
      </div>
    );
  }

  /**
   * Render establishment details inputs whether read only or not
   * @param  {object} establishmentDetails
   * @param  {boolean} readOnly
   * @return {XML}
   */
  renderEstablishmentDetails(establishmentDetails, readOnly) {
    const {
      establishmentNameLabelText, establishmentNameIdentifier, establishmentNameErrorMessage,
      address1LabelText, address1Identifier, address1ErrorMessage,
      townLabelText, townIdentifier, townErrorMessage,
      countyLabelText, countyIdentifier, countyErrorMessage,
      postCodeLabelText, postCodeIdentifier, postCodeErrorMessage,
      countryLabelText, countryIdentifier, countryErrorMessage,
    } = this.props;

    return (
      <div className="schoolDetails">
        {this.renderSingleInput(establishmentNameLabelText, establishmentNameIdentifier, establishmentDetails[establishmentNameIdentifier], establishmentNameErrorMessage, readOnly)}

        {this.renderSingleInput(address1LabelText, address1Identifier, establishmentDetails[address1Identifier], address1ErrorMessage, readOnly)}

        {this.renderSingleInput(townLabelText, townIdentifier, establishmentDetails[townIdentifier], townErrorMessage, readOnly)}

        {this.renderSingleInput(countyLabelText, countyIdentifier, establishmentDetails[countyIdentifier], countyErrorMessage, readOnly)}

        {this.renderSingleInput(postCodeLabelText, postCodeIdentifier, establishmentDetails[postCodeIdentifier], postCodeErrorMessage, readOnly)}

        {this.renderSingleInput(countryLabelText, countryIdentifier, establishmentDetails[countryIdentifier], countryErrorMessage, readOnly)}
      </div>
    );
  }

  /**
   * Render Component.
   * @return {XML}
   */
  render() {
    const {
      establishmentNameValue, address1Value, townValue, countyValue, postCodeValue, countryValue,
      establishmentNameIdentifier, address1Identifier, townIdentifier, countyIdentifier,
      postCodeIdentifier, countryIdentifier, min, selectedEstablishment,
    } = this.props;
    const { lookup, options } = this.state;

    return (
      <div className="SchoolsLookUp">
        <label htmlFor="schoolsLookUp">{"Enter your school's name or postcode"}</label>
        {lookup === HIDE_LOOKUP ?
          <div>
            {this.renderEstablishmentDetails(
              {
                [establishmentNameIdentifier]: selectedEstablishment.name,
                [address1Identifier]: selectedEstablishment.address_1,
                [townIdentifier]: selectedEstablishment.town,
                [countyIdentifier]: selectedEstablishment.county,
                [postCodeIdentifier]: selectedEstablishment.post_code,
                [countryIdentifier]: selectedEstablishment.country,
              },
              true,
            )}
            <button className="btn" onClick={this.handleLookup.bind(this, SHOW_EDCO_LOOKUP)}>
              Edit
            </button>
          </div>:
          <AsyncTypeahead
            type="text"
            minLength={min}
            bsSize="large"
            onSearch={this.handleSearch}
            onChange={this.handleChange}
            className="schoolsLookUpForm"
            labelKey={option => `${option.name} ${option.post_code}`}
            placeholder="Search"
            renderMenuItemChildren={this.renderMenuItemChildren}
            options={options}
          />
        }
        {lookup === SHOW_EDCO_LOOKUP ?
          <button className="btn" onClick={this.handleLookup.bind(this, SHOW_MANUAL_LOOKUP)}>
            Or enter address manually
          </button>:
          null
        }
        {lookup === SHOW_MANUAL_LOOKUP ?
          <div>
            <p>Or enter address manually</p>
            {this.renderEstablishmentDetails(
              {
                [establishmentNameIdentifier]: establishmentNameValue,
                [address1Identifier]: address1Value,
                [townIdentifier]: townValue,
                [countyIdentifier]: countyValue,
                [postCodeIdentifier]: postCodeValue,
                [countryIdentifier]: countryValue,
              },
              false,
            )}
          </div>:
          null
        }
      </div>
    );
  }
}

SchoolsLookUp.defaultProps = {
  selectedEstablishmentIdentifier: 'selectedEstablishment',
  selectedEstablishment: {},
  establishmentIdIdentifier: 'establishmentId',
  establishmentNameLabelText: 'Establishment name',
  establishmentNameIdentifier: 'establishmentName',
  establishmentNameErrorMessage: '',
  address1LabelText: 'Address',
  address1Identifier: 'address1',
  address1ErrorMessage: '',
  townLabelText: 'Town',
  townIdentifier: 'town',
  townErrorMessage: '',
  countyLabelText: 'County',
  countyIdentifier: 'county',
  countyErrorMessage: '',
  postCodeLabelText: 'Postcode',
  postCodeIdentifier: 'postCode',
  postCodeErrorMessage: '',
  countryLabelText: 'Country',
  countryIdentifier: 'country',
  countryErrorMessage: '',
  validateField: () => {},
};

SchoolsLookUp.propTypes = {
  data: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  establishmentIdValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  establishmentNameValue: PropTypes.string.isRequired,
  address1Value: PropTypes.string.isRequired,
  townValue: PropTypes.string.isRequired,
  countyValue: PropTypes.string.isRequired,
  postCodeValue: PropTypes.string.isRequired,
  countryValue: PropTypes.string.isRequired,
  selectedEstablishmentIdentifier: PropTypes.string,
  selectedEstablishment: PropTypes.object,
  establishmentIdIdentifier: PropTypes.string,
  establishmentNameLabelText: PropTypes.string,
  establishmentNameIdentifier: PropTypes.string,
  establishmentNameErrorMessage: PropTypes.string,
  address1LabelText: PropTypes.string,
  address1Identifier: PropTypes.string,
  address1ErrorMessage: PropTypes.string,
  townLabelText: PropTypes.string,
  townIdentifier: PropTypes.string,
  townErrorMessage: PropTypes.string,
  countyLabelText: PropTypes.string,
  countyIdentifier: PropTypes.string,
  countyErrorMessage: PropTypes.string,
  postCodeLabelText: PropTypes.string,
  postCodeIdentifier: PropTypes.string,
  postCodeErrorMessage: PropTypes.string,
  countryLabelText: PropTypes.string,
  countryIdentifier: PropTypes.string,
  countryErrorMessage: PropTypes.string,
  validateField: PropTypes.func,
};

export default SchoolsLookUp;
