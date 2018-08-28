/* eslint-env browser */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import './RadioButtons.scss';

const shortid = require('shortid');
const Markdown = require('react-markdown');

class RadioButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionsMarkup: null,
      valid: null,
      message: '',
      value: '',
      showErrorMessage: this.props.showErrorMessage,
    };
    this.setRef = (element) => {
      this.selectRef = element;
    };
    this.validateField = this.validateField.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
  }

  /**
   * Validate initial state
   * (will trigger an update through the validateField function)
   */
  componentDidMount() {
    this.createOptions();
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
   * Handle the onClick events
   * @param e
   */
  onClickHandler(e) {
    const value = e.target.value;
    this.setState({
      value,
      showErrorMessage: true,
    });
    this.validateField(e);
  }
  /**
   * Handle the onBlur event
   * @param e
   */
  onBlurHandler(e) {
    if (this.props.required) {
      this.validateField(e);
    }
  }
  /**
   * Helper function to add custom rendered for Markdown links
   */
  markdownLinkRenderer(props) {
    return (props.href.indexOf('/') === 0) ?
      <a className="link" href={props.href}>{props.children}</a> :
      <a
        className="link"
        href={props.href}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        {props.children}
      </a>;
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

    Object.keys(this.props.options).forEach((i) => {
      const thisKey = shortid.generate();
      options.push(
        <div
          className="form__field--wrapper form__radio form__radio--inline"
          key={`form__field--wrapper-${thisKey}`}
        >

          <label
            className="form__field-label"
            htmlFor={`radio--${thisKey}`}
            key={`form__field-label-${thisKey}`}
          >
            {this.props.options[i].label}
          </label>

          <input
            type="radio"
            id={`radio--${thisKey}`}
            name={this.props.id}
            value={this.props.options[i].value}
            key={`radio-button-${thisKey}`}
            onClick={this.onClickHandler}
            defaultChecked={this.props.options[i].selected}
          />
          <span>&nbsp;</span>

          {this.props.options[i].additionalText ?
            <div className="form__fieldset form__field--wrapper form__field-additional-text">
              <Markdown
                source={this.props.options[i].additionalText}
                renderers={{ link: this.markdownLinkRenderer }}
              />
            </div> : null }

        </div>,
      );
    });

    this.setState({
      optionsMarkup: options,
    });
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
   * Validate the radio button group and update the state with validation info
   * @param e
   */
  validateField(e) {
    let value = null;
    let eventType = null;
    const selectedValue = this.state.value;

    if (e !== undefined) {
      value = e.target.value;
      eventType = e.type;
    }

    if (this.props.required === true && eventType === 'blur' && selectedValue === undefined) {
      this.setState({
        valid: false,
        message: 'This field is required',
        value,
        showErrorMessage: true,
      });
    } else if (this.props.required === true && value) {
      // triggered by user change
      console.log('validate B');
      this.setState({
        valid: true,
        message: '',
        value,
        showErrorMessage: false,
      });
    } else {
      // initial load
      console.log('validate C');
      this.setState({
        valid: true,
        message: '',
        value,
        showErrorMessage: false,
      });
    }
  }

  renderOptions() {
    return this.state.optionsMarkup;
  }

  render() {
    const errorClass = this.state.showErrorMessage === true ? 'form__field-error-wrapper' : '';
    const extraClass = this.props.extraClass !== '' ? this.props.extraClass : '';
    return (
      <fieldset
        id={this.props.id}
        className={`form__fieldset form__field--wrapper form__field-wrapper--radio ${errorClass} ${extraClass}`}
        onBlur={this.onBlurHandler}
      >

        <legend className="form__fieldset--label">{this.props.label}</legend>

        { this.renderOptions() }

        { (this.state.valid === false && this.state.showErrorMessage === true && this.state.message !== '') &&
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
        }
      </fieldset>
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
  label: propTypes.string.isRequired,
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
