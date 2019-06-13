import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './fullHeightDoubleImageSingleCopy.scss';

export class FullHeightDoubleImageSingleCopy extends Component {
  render() {
    const { title, copies, btnCopy, position, btnTitle, btnLink, btnColour } = this.props;
    return (
      <section className={`paragraph--full-height-double-image-single-copy paragraph--full-height-double-image-single-copy--${position} bg--teal`}>
        <div className="fhdisc__image-wrapper">
          <div className="fhdisc__image">
            <img
              alt="pic"
              src="https://www.comicrelief.com/sites/default/files/styles/bg_rich_text_wide/public/2018-12/spectacular_header_v5%402x.jpg?itok=Pr8MA0UX"
            />
          </div>
          <div className="fhdisc__image">
            <img
              alt="pic"
              src="https://www.comicrelief.com/sites/default/files/styles/bg_rich_text_wide/public/2018-08/cr_your_impact_header_l_v2.jpg?itok=x6zA5nU0"
            />
          </div>
        </div>
        <div className="bg--teal fhdisc__text-wrapper">
          <div className="bg--magente fhdisc__text-3">
            <h1 className="text-align-center">
              <strong>{title}</strong>
            </h1>
            <p className="text-align-center"> { copies } </p>
            <p className="text-align-center">
              <a
                className={`btn ${btnColour}`}
                href={btnLink}
                title={btnTitle}
              >
                {btnCopy}
              </a>
            </p>
          </div>
        </div>
      </section>
    );
  }
}

FullHeightDoubleImageSingleCopy.propTypes = {
  btnCopy: PropTypes.string.isRequired,
  copies: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default FullHeightDoubleImageSingleCopy;
