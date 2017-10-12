import React, { Component } from 'react';
// import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import PropTypes from 'prop-types';
import { geolocated } from 'react-geolocated';
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
    
    // Don't search on load for now
    //this.search('', 5);
  }


  /**
   * @param searchTerm
   * @param range
   * @private
   */
  search(searchTerm, range) {

    this.setState({
      searching: true,
    });

    const query = `${this.props.postcodeAPI}/postcodes/${searchTerm}`;
    fetch(`${query}`)
      .then(r => r.json())
      .then((json) => {
        // Store the co-ordinates that PostcodeAPI returns in our state
        this.setState({
          longitude: (json && json.result && json.result.longitude) || null,
          latitude: (json && json.result && json.result.latitude) || null,
        });

        const query2 = searchTerm.length >= 1 ? `${this.props.searchURL}?latitude=${json.result.latitude}&longitude=${json.result.longitude}&range=${range}km` : this.props.searchURL;
        return fetch(`${query2}`)
          .then(r => r.json())
          .then((json2) => {
            this.setState({
              pagination: (json2 && json2.data && json2.data.pagination) || [],
              results: (json2 && json2.data && json2.data.grants) || [],
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
      fetch(`${query}`)
        .then(r => r.json())
        .then((json) => {

          // Update to use the nearest postcode to this geolocation
          this.refs.search.geoPostcode( json.result[0].postcode );
        });
  }

  geoLocateAllow(boolean){
    // Passed from the search component
     this.setState({
      useGeolocation: boolean,
    });
  }

  /**
   *
   * @returns {XML}
   */
  render() {
    return (<div className="funded-projects">
      <Header />

      <div className="paging-information">
        <p>{this.state.pagination.total} results - Page {this.state.pagination.page}
            of {this.state.pagination.pages}</p>
      </div>

      <Search searchHandler={this.searchHandler} geoLocateAllow={this.geoLocateAllow} ref="search"/>

      {this.state.useGeolocation ?  <Geolocation handleLocation={this.handleLocation} ref="geo"/> : null }

      {this.state.searching ? 
        <div className="geo-info">
          <p>Finding projects near you...</p>
          <span className="geo-info--spinner" />
          </div> : null }

      {this.state.results.map((result, i) => (
        <Result key={i} result={result.data} />))}
    </div>);
  }
}

GrantsNearYou.propTypes = {
  postcodeAPI: PropTypes.string.isRequired,
  searchURL: PropTypes.string.isRequired,
};

export default GrantsNearYou;
