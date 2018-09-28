/* eslint-env browser */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import browser from 'browser-detect';
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
      this.radioButtonRef = element;
    };
    this.validateField = this.validateField.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
  }

  componentWillMount() {
    /* Get values from any preselected radiob buttons */
    const selected = this.props.options.find(item => item.selected === true);

    if (selected !== undefined) {
      this.setState({
        value: selected.value,
      });
    }
  }

  /**
   * Validate initial state
   * (will trigger an update through the validateField function)
   */
  componentDidMount() {
    this.createOptions();
    this.validateField(this.state.value, 'mount');
  }

  /**
   * If parent updates the value update state with new value
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    // Update the error msg status if the parent has
    if (nextProps.showErrorMessage === true) {
      this.setState({
        ...this.state,
        showErrorMessage: nextProps.showErrorMessage,
      });
    }
  }

  /**
   * When component has updated send state to parent
   */
  componentDidUpdate() {
    /* Uses isValid callback function sending state and id to parent */
    if (typeof this.props.isValid === 'function') {
      this.props.isValid(this.state, this.props.id);
    }
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
    /* Pass new value straight to validate method, to allow pre-state update validation */
    this.validateField(value, 'click');
  }
  /**
   * Handle the onBlur event
   * @param e
   */
  onBlurHandler() {
    /* If we're blurring away from a required set of buttons: */
    if (this.props.required) {
      /* Pass in a previous set state to avoid error msg */
      this.validateField(this.state.value, 'blur');
    }
  }
  /**
   * Helper function to add custom rendered for Markdown links
   */
  markdownLinkRenderer(props) {
    return (props.href.indexOf('/') === 0) ?
      <a className="link inline additional-text__link" href={props.href}>{props.children}</a> :
      <a
        className="link inline additional-text__link"
        href={props.href}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        {props.children}
        <span className="visuallyhidden">(opens in a new window)</span>
      </a>;
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
            <Markdown
              source={this.props.options[i].additionalText}
              renderers={{ link: this.markdownLinkRenderer }}
              className="form__fieldset form__field--wrapper form__field-additional-text"
            /> : null }
        </div>,
      );
    });

    this.setState({
      optionsMarkup: options,
    });
  }

  /**
   * Validate the radio button group and update the state with validation info
   * @param updatedValue
   * @param eventType string
   */
  validateField(updatedValue, eventType) {
    /* The current selected value, set to null if empty */
    const selectedValue = (updatedValue !== '' ? updatedValue : null);

    if (this.props.required === true) {
      /* A: If our required btn group doesn't have a value, set the show msg status based on the event type */
      if (selectedValue === null) {
        this.setState({
          valid: false,
          message: 'This field is required',
          showErrorMessage: eventType !== 'mount',
        });
      } else if (selectedValue) {
        /* B: Else, if it's required & we've a value set by the user or preset */
        this.setState({
          valid: true,
          message: '',
          showErrorMessage: false,
        });
      }
    } else {
      /* C: For non-required buttons */
      this.setState({
        valid: true,
        message: '',
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
    const hasError = this.state.valid === false || (this.props.showErrorMessage === true && this.state.message !== '');
    const hasErrorClass = hasError ? 'form__field--erroring' : '';
    const isBrowser = browser();
    const supportedAriaAttributes = isBrowser.name === 'firefox' && isBrowser.os.match('Windows') ?
      { 'aria-live': 'assertive', 'aria-relevant': 'additions removals' } : { 'aria-live': 'assertive', role: 'status' };

    return (
      <fieldset
        id={this.props.id}
        className={`form__fieldset form__field--wrapper form__field-wrapper--radio ${errorClass} ${extraClass} ${hasErrorClass}`}
        onBlur={this.onBlurHandler}
        ref={this.setRef}
      >

        <legend className="form__fieldset--label">{this.props.label}</legend>

        { this.renderOptions() }

        { (this.state.valid === false && this.state.showErrorMessage === true && this.state.message !== '') &&
        <div
          id={`field-error--${this.props.id}`}
          className="form__field-error-container form__field-error-container--radio"
          {...supportedAriaAttributes}
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
  isValid: null,
  showErrorMessage: false,
  value: null,
};

RadioButtons.propTypes = {
  id: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  required: propTypes.bool.isRequired,
  options: propTypes.arrayOf(propTypes.shape({
    label: propTypes.string.isRequired,
    value: propTypes.oneOfType([
      propTypes.string,
      propTypes.number]),
    selected: propTypes.bool,
  }).isRequired).isRequired,
  value: propTypes.func,
  extraClass: propTypes.string,
  isValid: propTypes.func,
  showErrorMessage: propTypes.bool,
};

export default RadioButtons;
