import React, { Component } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import PropTypes from 'prop-types';
import './GrantsNearYou.scss';
import { Result } from './result';
import Search from './search';
import Header from './header';

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
    const query = `${this.props.postcodeAPI}/postcodes/${searchTerm}`;
    fetch(`${query}`)
      .then(r => r.json())
      .then((json) => {
        const query2 = searchTerm.length >= 1 ? `${this.props.searchURL}?latitude=${json.result.latitude}&longitude=${json.result.longitude}&range=${range}km` : this.props.searchURL;
        return fetch(`${query2}`)
          .then(r => r.json())
          .then((json) => {
            this.setState({
              pagination: json && json.data && json.data.pagination || [],
              results: json && json.data && json.data.grants || [],
            });
          });
      });
  }

  /**
   *
   * @param data
   * @param range
   */
  searchHandler(data, range) {
    this.search(data, range);
  }
  /**
   *
   * @returns {XML}
   */
  render() {
    return (

      <div className="funded-projects">

        <Header />

        <div className="paging-information">
          <p>{this.state.pagination.total} results - Page {this.state.pagination.page} of {this.state.pagination.pages}</p>
        </div>

        <Search searchHandler={this.searchHandler} />

        { this.state.results.map((result, i) => (
          <Result key={i} result={result.data} />))}
      </div>
    );
  }
}

GrantsNearYou.propTypes = {
  postcodeAPI: PropTypes.string.isRequired,
  searchURL: PropTypes.string.isRequired,
};

export default GrantsNearYou;
