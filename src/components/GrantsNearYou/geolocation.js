import React from 'react';
import propTypes from 'prop-types';
import { geolocated } from 'react-geolocated';

class Geolocation extends React.Component {
  /**
   * @param prevProps
   * @param prevState
   */
  componentDidUpdate(prevProps) {
    // Triggered *only* when the component is ready and coords have changed
    if (this.props.coords && (this.props.coords !== prevProps.coords)) {
      this.props.handleLocation(this.props.coords);
    }
  }

  /**
   * @returns {XML}
   */
  render() {
    return (

      <div className="geo-info">

        {!this.props.isGeolocationAvailable ? <p>Geolocation not available</p> : null}

        {!this.props.isGeolocationEnabled ? <p>Geolocation not enabled</p> : null}

        {(!this.props.coords && this.props.isGeolocationEnabled && this.props.isGeolocationAvailable) ? <div className="geo-info--finding">
          <p>Finding your location...</p>
          <span className="geo-info--spinner" /></div> : null}
      </div>);
  }
}

/* Define propTypes */
Geolocation.propTypes = {
  handleLocation: propTypes.func.isRequired,
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: null,
})(Geolocation);
