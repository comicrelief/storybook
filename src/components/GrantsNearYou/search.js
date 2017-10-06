import React, { Component } from 'react';


export default class Search extends Component {

  /**
   *
   */
  constructor()
  {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.state = {
      inputField: '',
      range: '5',
      searchTimeout: 0,
    };
  }

  /**
   *
   * @param evt
   */
  submitHandler(evt)
  {
    evt.preventDefault();
    // pass the input field value to the event handler passed
    // as a prop by the parent (App)
    this.props.searchHandler(this.state.inputField, this.state.range);

    this.setState({
      inputField: '',
      range: '',
    });
  }

  /**
   *
   * @param event
   */
  handleChange(e)
  {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value
    });

    let self = this;
    clearTimeout(self.state.searchTimeout);

    self.state.searchTimeout = setTimeout(function () {
      self.props.searchHandler(self.state.inputField, self.state.range);
    }, 500);
  }

  /**
   *
   * @returns {XML}
   */
  render()
  {
    return (
      <div className="search-container">
        <form onSubmit={this.submitHandler}>
          <input type="text"
                 name="inputField"
                 placeholder="Postcode Search (e.g. SE17TP)"
                 value={this.state.inputField}
                 onKeyUp={this.handleChange} />
          <label for="range">Range (km)</label>
          <input type="number"
                 name="range"
                 min="1"
                 max="100"
                 value={this.state.range}
                 onChange={this.handleChange} />
        </form>
      </div>
    );
  }
}
