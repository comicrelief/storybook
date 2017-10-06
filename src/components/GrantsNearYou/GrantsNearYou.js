import React, { Component } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import PropTypes from 'prop-types';
import './GrantsNearYou.scss';
import { Result } from './result';
import Search from './search';
import Header from "./header";

class GrantsNearYou extends Component {

  /**
   * GrantsNearYou constructor.
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = {
      pagination: [],
      results: [],
    };
    this.searchHandler = this.searchHandler.bind(this);
  }

  /**
   * @param searchTerm
   * @param range
   * @private
   */
  _search(searchTerm, range)
  {
    let query = this.postcodeAPI + '/postcodes/' + searchTerm;
    console.log("this.postcodeAPI:", this.postcodeAPI );
    fetch(`${query}`)
      .then( r => r.json() )
      .then(json => {
        let query = searchTerm.length >= 1 ? (SEARCH + '?latitude=' + json.result.latitude + '&longitude=' + json.result.longitude) + '&range=' + range + 'km' : SEARCH;
        return fetch(`${query}`)
          .then( r => r.json() )
          .then( json => {
            this.setState({
              pagination: json && json.data && json.data.pagination || [],
              results: json && json.data && json.data.grants || []
            });
          });
      });
  }

  /**
   *
   * @param data
   */
  searchHandler(data, range)
  { console.log("******** searchHandler *********");
    this._search(data, range)
  }

  /**
   *
   */
  componentDidMount()
  {
    this._search('', 5);
  }

  /**
   *
   * @param props
   * @param results
   * @param pagination
   * @returns {XML}
   */
  render(props) {


    return (

      <div className="funded-projects">

        <Header />

        <p>{this.props.results}</p>
        <p>{this.props.pagination}</p>

        {/*
        <div className="paging-information">
          <p>{this.pagination.total} results - Page {this.pagination.page} of {this.pagination.pages}</p>
        </div> */}

        <Search searchHandler={this.searchHandler} />

      </div>
    );
  }
}

GrantsNearYou.propTypes = {
  postcodeAPI: PropTypes.string.isRequired,
  searchURL: PropTypes.string.isRequired,
};

export default GrantsNearYou;
