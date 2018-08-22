/* eslint-env browser */
import React, { Component } from 'react';
import propTypes from 'prop-types';

// const shortid = require('shortid');

class RadioButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: null,
      message: '',
      value: '',
      showErrorMessage: this.props.showErrorMessage,
    };
    this.setRef = (element) => {
      this.selectRef = element;
    };
    this.validateField = this.validateField.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  componentWillMount() {
    this.setState({
      value: this.getSelectedOption(),
    });
  }
  /**
   * Validate initial state
   * (will trigger an update through the validateField function)
   */
  componentDidMount() {
    this.validateField();
  }

  /**
   * If parent updates the value update state with new value
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (typeof this.props.value === 'function' && this.state.value !== nextProps.value()) {
      this.setState({
        ...this.state,
        value: nextProps.value(),
      });
    }
  }

  /**
   * When component has updated send state to parent
   */
  componentDidUpdate() {
    this.sendStateToParent();
  }

  /**
   * Handle the onChange and onBlur events
   * @param e
   */
  onChangeHandler(e) {
    const value = e.target.value;
    this.setState({
      value,
      showErrorMessage: true,
    });
    this.validateField(e);
  }

  /**
   * Get the default option, marked as selected from the props.options array
   * Returns the value or undefined
   */
  getSelectedOption() {
    let selected = this.props.options.find(item => item.selected === true);
    if (selected !== undefined) {
      selected = selected.value;
    }
    return selected;
  }

  /**
   * Uses isValid callback function sending state, value and field name to parent
   */
  sendStateToParent() {
    if (typeof this.props.isValid === 'function') {
      this.props.isValid(this.state, this.props.name, this.state.value);
    }
  }

  /**
   * Create array with option tags from props.options
   * @returns {Array}
   */
  createOptions() {
    const options = [];
    this.props.options.map(item =>
      options.push(
        <div className="form__field--wrapper form__radio form__radio--inline">
          <label className="form__field-label" htmlFor="radio-2">{item.label}</label>
          <input type="radio" id="radio-2" name="radio-group" value={item.value} />
          <span>&nbsp;</span>
        </div>,
      ));
    return options;
  }

  /**
   * If value is an object, json stringify it
   * @param value
   * @returns {*}
   */
  checkValueType(value) {
    return typeof value === 'object' ? JSON.stringify(value) : value;
  }

  /**
   * Validate the select field and update the state with validation info
   * @param e
   */
  validateField(e) {
    const value = e !== undefined ? e.target.value : this.selectRef.value;
    if (this.props.required === true && value === '') {
      this.setState({
        valid: false,
        message: 'This field is required',
        value,
      });
    } else if (this.props.required === true && value) {
      this.setState({
        valid: true,
        message: '',
        value,
        showErrorMessage: false,
      });
    } else {
      this.setState({
        valid: true,
        message: '',
        value,
        showErrorMessage: false,
      });
    }
  }

  render() {
    const errorClass = this.state.showErrorMessage === true ? 'form__field-error-wrapper' : '';
    const extraClass = this.props.extraClass !== '' ? this.props.extraClass : '';
    return (
      <div
        id={`field-wrapper--${this.props.id}`}
        className={`form__fieldset form__field--wrapper form__field-wrapper--radio ${errorClass} ${extraClass}`}
      >
        { this.createOptions() }

        {/*        { (this.state.valid === false && this.state.showErrorMessage === true && this.state.message !== '') &&
        <div
          id={`field-error--${this.props.id}`}
          className="form__field-error-container form__field-error-container--radio"
          aria-live="assertive"
          role="status"
        >
          <span className="form-error">
            {this.state.message}
          </span>
        </div>
        } */}
      </div>
    );
  }
}

RadioButtons.defaultProps = {
  extraClass: '',
  isValid: () => {},
  showErrorMessage: false,
  value: null,
};

RadioButtons.propTypes = {
  id: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  // label: propTypes.string.isRequired,
  required: propTypes.bool.isRequired,
  options: propTypes.arrayOf(propTypes.shape({
    label: propTypes.string.isRequired,
    value: propTypes.oneOfType([
      propTypes.string,
      propTypes.object]),
    selected: propTypes.bool,
  }).isRequired).isRequired,
  value: propTypes.func,
  extraClass: propTypes.string,
  isValid: propTypes.func,
  showErrorMessage: propTypes.bool,
};

export default RadioButtons;
