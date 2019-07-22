import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './GrantsNearYou.scss';
import { Result } from './result';
import Search from './search';
import Header from './header';
import Geolocation from './geolocation';

class GrantsNearYou extends Component {
  /**
   * GrantsNearYou constructor.
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      pagination: [],
      coordinates: [],
      useGeolocation: false,
      searching: false,

    };
    this.searchHandler = this.searchHandler.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.geoLocateAllow = this.geoLocateAllow.bind(this);
  }
  /**
   *
   */
  componentDidMount() {
    this.search('', 5);
  }

  /**
   * @param searchTerm
   * @param range
   * @private
   */
  search(searchTerm, range) {
    if (!searchTerm) {
      return;
    }
    this.setState({
      searching: true,
    });
    const query = `${this.props.postcodeAPI}/postcodes/${searchTerm}`;
    axios.get(query)
      .then(({ data }) => data)
      .then((json) => {
        // Store the co-ordinates that PostcodeAPI returns in our state
        this.setState({
          longitude: (json && json.result && json.result.longitude) || null,
          latitude: (json && json.result && json.result.latitude) || null,
        });
        const { searchURL, searchKey } = this.props;
        if (!searchURL || !searchKey) {
          return null;
        }
        const processedSearchUrl = searchTerm.length >= 1 ? `${searchURL}?latitude=${json.result.latitude}&longitude=${json.result.longitude}&range=${range}km` : this.props.searchURL;
        return axios({ url: processedSearchUrl, headers: { 'x-internal-access-key': searchKey } })
          .then(({ data }) => data)
          .then((grantsResponse) => {
            this.setState({
              pagination: (grantsResponse && grantsResponse.data && grantsResponse.data.pagination) || [],
              results: (grantsResponse && grantsResponse.data && grantsResponse.data.grants) || [],
              searching: false,
            });
          });
      });
  }

  /**
   * @param data
   * @param range
   */
  searchHandler(data, range) {
    this.search(data, range);
  }

  /**
   * @param coordsIn
   */
  handleLocation(coordsIn) {
    // Update state with values from Geolocation component
    this.setState({
      coordinates: coordsIn,
    });

    // Create query PostcodeAPI query to return nearest postcode to this geolocation
    const query = `${this.props.postcodeAPI}/postcodes?lon=${coordsIn.longitude}&lat=${coordsIn.latitude}`;
    axios.get(query)
      .then(({ data }) => data)
      .then((json) => {
        // Update to use the nearest postcode to this geolocation
        this.searchRef.geoPostcode(json.result[0].postcode);
      });
  }

  geoLocateAllow(boolean) {
    // Passed from the search component
    this.setState({
      useGeolocation: boolean,
    });
  }

  /**
   * @returns {XML}
   */
  render() {
    return (<div className="funded-projects">
      <Header />

      <div className="paging-information">
        <p>{this.state.pagination.total} results - Page {this.state.pagination.page}
            of {this.state.pagination.pages}</p>
      </div>

      <Search searchHandler={this.searchHandler} geoLocateAllow={this.geoLocateAllow} ref={(el) => { this.searchRef = el; }} />

      {this.state.useGeolocation ? <Geolocation handleLocation={this.handleLocation} ref={(el) => { this.geoRef = el; }} /> : null }

      {this.state.searching ?
        <div className="geo-info">
          <p>Finding nearby projects...</p>
          <span className="geo-info--spinner" />
        </div> : null }

      {this.state.results.map((result, i) => (<Result key={i} result={result.data} />))}


    </div>
    );
  }
}

GrantsNearYou.propTypes = {
  postcodeAPI: PropTypes.string.isRequired,
  searchURL: PropTypes.string.isRequired,
};

export default GrantsNearYou;
