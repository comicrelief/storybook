import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import './SchoolsLookUp.scss';

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
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      schools: [],
      establishmentName: '',
      address_1: '',
      town: '',
      townCity: '',
      post_code: '',
      country: '',
      lookup: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleManualEntryClick = this.handleManualEntryClick.bind(this);
    this.handleManual = this.handleManual.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.renderSingleInput = this.renderSingleInput.bind(this);
    this.renderSchoolDetails = this.renderSchoolDetails.bind(this);
  }

  /**
   * Handle click event.
   * @param e
   */
  handleManualEntryClick(e) {
    e.preventDefault();
    this.setState({ lookup: !this.state.lookup });
    this.props.onChange();
  }

  /**
   * Handle search event.
   * @param query
   */
  handleSearch(query) {
    if (!query) {
      return;
    }
    axios.get(this.props.data + query)
      .then((response) => {
        this.setState({ options: response.data.data.schools });
      });
    this.props.onChange();
  }

  /**
   * Handle change event.
   * @param data
   */
  handleChange(data) {
    this.setState({
      schools: data,
      lookup: true,
    });
    this.props.onChange('address', { target: { value: data } });
  }

  /**
   * Handle change event.
   * @param event
   */
  handleManual(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
    this.props.onChange(name, event);
  }

  /**
   * Handle blur event.
   * @param id
   */
  handleBlur(id) {
    const {
      validateField,
    } = this.props;
    if (validateField) {
      validateField(id);
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
    const inputProps = {
      value,
      type: 'text',
      id: identifier,
      name: identifier,
      required: true,
      className: '',
    };
    if (readOnly === true) {
      inputProps.readOnly = true;
    } else {
      inputProps.onChange = this.handleManual.bind(this, identifier);
      inputProps.onBlur = this.handleBlur.bind(this, identifier);
      inputProps.className = `${inputProps.className} validation__wrapper`;
    }
    return (
      <label htmlFor={identifier}>
        {labelText}<span className="required">*</span>
        <input {...inputProps} />
        {readOnly === false && errorMessage ?
          <div className="validation__message">
            <span>
              {errorMessage}
            </span>
          </div>:
          null
        }
        <br />
      </label>
    );
  }

  /**
   * Render school details inputs whether read only or not
   * @param  {object} schoolDetails
   * @param  {boolean} readOnly
   * @return {XML}
   */
  renderSchoolDetails(schoolDetails, readOnly) {
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
        {this.renderSingleInput(establishmentNameLabelText, establishmentNameIdentifier, schoolDetails.establishmentName, establishmentNameErrorMessage, readOnly)}

        {this.renderSingleInput(address1LabelText, address1Identifier, schoolDetails.address1, address1ErrorMessage, readOnly)}

        {this.renderSingleInput(townLabelText, townIdentifier, schoolDetails.town, townErrorMessage, readOnly)}

        {this.renderSingleInput(countyLabelText, countyIdentifier, schoolDetails.county, countyErrorMessage, readOnly)}

        {this.renderSingleInput(postCodeLabelText, postCodeIdentifier, schoolDetails.postCode, postCodeErrorMessage, readOnly)}

        {this.renderSingleInput(countryLabelText, countryIdentifier, schoolDetails.country, countryErrorMessage, readOnly)}
      </div>
    );
  }

  /**
   * Render Component.
   * @return {XML}
   */
  render() {
    const {
      establishmentName,
      address_1,
      town,
      townCity,
      post_code,
      country,
    } = this.state;


    return (
      <div className="SchoolsLookUp">
        <label htmlFor="schoolsLookUp">{"Enter your school's name or postcode"}
          <AsyncTypeahead
            type="text"
            minLength={this.props.min}
            bsSize="large"
            onSearch={this.handleSearch}
            onChange={this.handleChange}
            className="schoolsLookUpForm"
            labelKey={option => `${option.name} ${option.post_code}`}
            placeholder="Search"
            renderMenuItemChildren={this.renderMenuItemChildren}
            options={this.state.options}
          />
        </label>
        <button className="lookupTrue" onClick={this.handleManualEntryClick}>
          Or enter address manually
        </button>
        {this.state.lookup ?
          <div>
            {this.state.schools.map(school => (
              this.renderSchoolDetails(
                {
                  establishmentName: school.name,
                  address1: school.address_1,
                  town: school.town,
                  county: school.county,
                  postCode: school.post_code,
                  country: school.country,
                },
                true,
              )
            ))
            }
          </div>
          :
          this.renderSchoolDetails(
            {
              establishmentName,
              address1: address_1,
              town,
              county: townCity,
              postCode: post_code,
              country,
            },
            false,
          )
        }
      </div>
    );
  }
}

SchoolsLookUp.defaultProps = {
  establishmentNameLabelText: 'School name',
  establishmentNameIdentifier: 'establishmentName',
  establishmentNameErrorMessage: '',
  address1LabelText: 'Address',
  address1Identifier: 'address_1',
  address1ErrorMessage: '',
  townLabelText: 'Town',
  townIdentifier: 'town',
  townErrorMessage: '',
  countyLabelText: 'County',
  countyIdentifier: 'townCity',
  countyErrorMessage: '',
  postCodeLabelText: 'Postcode',
  postCodeIdentifier: 'post_code',
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
