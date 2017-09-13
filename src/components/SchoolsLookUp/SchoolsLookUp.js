import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import './SchoolsLookUp.scss';

class SchoolsLookUp extends Component {
  /**
   * SchoolsLookUp constructor.
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      schools: [],
      lookup: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  /**
   * Handle click event.
   * @param e
   */
  handleClick(e) {
    e.preventDefault();
    this.setState({ lookup: false });
  }

  /**
   * Handle search event.
   * @param query
   */
  handleSearch(query) {
    console.log(this);
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
  }

  /**
   * Handle change event.
   * @param data
   */
  handleChange(data) {
    this.setState({
      schools: data,
    });
  }

  /**
   * Render menu item children.
   * @param option
   * @return {XML}
   */
  renderMenuItemChildren(option) {
    return (
      <div key={option.id}>
        <span>{option.name}, </span>
        <span>{option.postcode}</span>
      </div>
    );
  }

  /**
   * Render Component.
   * @return {XML}
   */
  render() {
    return (
      <div className="SchoolsLookUp">
        {this.state.lookup ?
          <div>
            <label htmlFor="schoolsLookUp">{"Enter your school's name or postcode"}
              <AsyncTypeahead
                type="text"
                minLength={this.props.min}
                bsSize="large"
                onSearch={this.handleSearch}
                onChange={this.handleChange}
                className="schoolsLookUpForm"
                labelKey={option => `${option.name} ${option.postcode}`}
                placeholder="Search"
                renderMenuItemChildren={this.renderMenuItemChildren}
                options={this.state.options}
              />
            </label>
            <a href="#" className="lookupTrue" onClick={this.handleClick}>Or enter address manually</a>
            {this.state.schools.map((school) => {
              return (
                <div className="schoolDetails">
                  <label htmlFor="establishmentName">
                    Establishment name
                    <input value={school.name} type="text" id="establishmentName" /><br />
                  </label>

                  <label htmlFor="addressLine1">
                    Address line 1
                    <input value={school.addressLine1} type="text" id="addressLine1" /><br />
                  </label>

                  <label htmlFor="addressLine2">
                    Address line 2
                    <input value={school.addressLine2} type="text" id="addressLine2" /><br />
                  </label>

                  <label htmlFor="addressLine3">
                    Address line 3
                    <input value={school.addressLine3} type="text" id="addressLine3" /><br />
                  </label>

                  <label htmlFor="townCity">
                    Town/City
                    <input value={school.county} type="text" id="townCity" /><br />
                  </label>

                  <label htmlFor="postcode">
                    Postcode
                    <input value={school.postcode} type="text" id="postcode" /><br />
                  </label>

                </div>
              );
            })
            }
          </div>
          :
          <div className="schoolDetails">
            <label htmlFor="establishmentName">
              Establishment name
              <input type="text" id="establishmentName" /><br />
            </label>

            <label htmlFor="addressLine1">
              Address line 1
              <input type="text" id="addressLine1" /><br />
            </label>

            <label htmlFor="addressLine2">
              Address line 2
              <input type="text" id="addressLine2" /><br />
            </label>

            <label htmlFor="addressLine3">
              Address line 3
              <input type="text" id="addressLine3" /><br />
            </label>

            <label htmlFor="townCity">
              Town/City
              <input type="text" id="townCity" /><br />
            </label>

            <label htmlFor="postcode">
              Postcode
              <input type="text" id="postcode" /><br />
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
};

export default SchoolsLookUp;
