import React from 'react';
import PropTypes from 'prop-types';
import { geolocated } from 'react-geolocated';

class Geolocation extends React.Component {
  /**
   * @param prevProps
   * @param prevState
   */
  componentDidUpdate(prevProps, prevState) {
    // Triggered *only* when the component is ready and coords have changed
    if (this.props.coords && (this.props.coords !== prevProps.coords) ) {
      this.props.handleLocation(this.props.coords);
    }
  }

  /**
   * @returns {XML}
   */
  render() {
    return (
      <div className="geo-information">
        { !this.props.isGeolocationAvailable ? <p>Geolocation not available</p>
          : !this.props.isGeolocationEnabled ? <p>Geolocation not enabled</p>
            : !this.props.coords ? <p>Finding your location...</p>
              : <div className="success-message">
                <p>Longitude: {this.props.coords.longitude}</p>
                <p>Latitude: {this.props.coords.latitude}</p>
              </div> }
      </div>
    );
  }
}

/* Define proptypes */
Geolocation.PropTypes = {
  handleLocation: PropTypes.func.isRequired,
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: null,
})(Geolocation);
