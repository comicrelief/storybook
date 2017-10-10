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
  static renderMenuItemChildren (option) {
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
  constructor (props) {
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
    this.handleClick = this.handleClick.bind(this);
    this.handleManual = this.handleManual.bind(this);
  }

  /**
   * Handle click event.
   * @param e
   */
  handleClick (e) {
    e.preventDefault();
    if (this.state.lookup) {
      this.setState({ lookup: false });
    } else {
      this.setState({ lookup: true });
    }
    this.props.onChange();
  }

  /**
   * Handle search event.
   * @param query
   */
  handleSearch (query) {
    if (!query) {
      return;
    }
    axios.get(this.props.data + query)
      .then((response) => {
        this.setState({ options: response.data.data.schools });
      })
      .catch((error) => {
        console.log('error fetching', error);
      });
    this.props.onChange();
  }

  /**
   * Handle change event.
   * @param data
   */
  handleChange (data) {
    this.setState({
      schools: data,
      lookup: true,
    });
    this.props.onChange();
  }

  /**
   * Handle change event.
   * @param event
   */
  handleManual (event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
    this.props.onChange();
  }

  /**
   * Render Component.
   * @return {XML}
   */
  render () {
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
        <button className="lookupTrue" onClick={this.handleClick}>
          Or enter address manually
        </button>
        {this.state.lookup ?
          <div>
            {this.state.schools.map(school => (
              <div className="schoolDetails">
                <label htmlFor="establishmentName">
                    School name<span className="required">*</span>
                  <input value={school.name} type="text" id="establishmentName" required readOnly /><br />
                </label>
                <label htmlFor="address_1">
                    Address<span className="required">*</span>
                  <input value={school.address_1} type="text" id="address_1" required readOnly /><br />
                </label>
                <label htmlFor="town">
                    Town
                  <input value={school.town} type="text" id="town" readOnly /><br />
                </label>
                <label htmlFor="townCity">
                    County
                  <input value={school.county} type="text" id="townCity" readOnly /><br />
                </label>
                <label htmlFor="post_code">
                    Postcode<span className="required">*</span>
                  <input value={school.post_code} type="text" id="post_code" required readOnly /><br />
                </label>
                <label htmlFor="country">
                    Country
                  <input value={school.country} type="text" id="country" readOnly /><br />
                </label>
              </div>
            ))
            }
          </div>
          :
          <div className="schoolDetails">
            <label htmlFor="establishmentName">
              School name<span className="required">*</span>
              <input
                value={this.state.establishmentName}
                onChange={this.handleManual}
                type="text"
                id="establishmentName"
                name="establishmentName"
                required
              /><br />
            </label>
            <label htmlFor="address_1">
              Address<span className="required">*</span>
              <input
                value={this.state.address_1}
                onChange={this.handleManual}
                type="text"
                id="address_1"
                name="address_1"
                required
              />
              <br />
            </label>
            <label htmlFor="town">
              Town
              <input value={this.state.town} onChange={this.handleManual} type="text" id="town" name="town" /><br />
            </label>
            <label htmlFor="townCity">
              County
              <input
                value={this.state.townCity}
                onChange={this.handleManual}
                type="text"
                id="townCity"
                name="townCity"
              /><br />
            </label>
            <label htmlFor="post_code">
              Postcode<span className="required">*</span>
              <input
                value={this.state.post_code}
                onChange={this.handleManual}
                type="text"
                id="post_code"
                name="post_code"
                required
              /><br />
            </label>
            <label htmlFor="country">
              Country
              <input
                value={this.state.country}
                onChange={this.handleManual}
                type="text"
                id="country"
                name="country"
              /><br />
            </label>
          </div>
        }
      </div>
    );
  }
}

SchoolsLookUp.propTypes = {
  data: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};

export default SchoolsLookUp;
