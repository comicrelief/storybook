import React, { Component } from 'react';
import axios from 'axios';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import './SchoolsLookUp.scss';

class SchoolsLookUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      options: [],
      schools: [],
    };
    this._handleChange = this._handleChange.bind(this);
  }

  render() {
    return (
      <div className="SchoolsLookUp">
          <AsyncTypeahead
            type="text"
            minLength={this.props.min}
            bsSize="large"
            onSearch={this._handleSearch}
            onChange={this._handleChange}
            className="schoolsLookUp"
            labelKey={option => `${option.name} ${option.postcode}`}
            placeholder="Search your School.."
            renderMenuItemChildren={this._renderMenuItemChildren}
            options={this.state.options}
          />
          { this.state.schools.map((school) => {
            return (
              <div className="schoolDetails">
                <label htmlFor="establishmentName">Establishment name</label>
                <input value={school.name} type="text" id="establishmentName"/><br/>
                <label htmlFor="addressLine1">Address line 1</label>
                <input value={school.addressLine1} type="text" id="addressLine1"/><br/>
                <label htmlFor="addressLine2">Address line 2</label>
                <input value={school.addressLine2} type="text" id="addressLine2"/><br/>
                <label htmlFor="addressLine3">Address line 3</label>
                <input value={school.addressLine3} type="text" id="addressLine3"/><br/>
                <label htmlFor="townCity">Town/City</label>
                <input value={school.county} type="text" id="townCity"/><br/>
                <label htmlFor="postcode">Postcode</label>
                <input value={school.postcode} type="text" id="postcode"/><br/>
              </div>
            )
          })
          }
      </div>
    );
  }

  _handleSearch = query => {
    if (!query) {
      return;
    }
    axios.get(this.props.data + query)
      .then((response) => {
        this.setState({options: response.data.data.schools});
      })
      .catch(error => {
        console.log('error fetching', error);
      })
  }

  _renderMenuItemChildren(option, id) {
    return (
      <div key={option.id}>
        <span>{option.name}, </span>
        <span>{option.postcode}</span>
      </div>
    );
  }

  _handleChange(data) {
    this.setState({
      schools: data,
    })
  }
}

export default SchoolsLookUp;
