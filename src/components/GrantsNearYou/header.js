import React, { Component } from 'react';

export default class Header extends Component {

  render() {
    return (
      <header class="bg--dark-blue promo-header promo-header__header promo-header--default promo-header--no-image">
        <div class="promo-header__content">
          <div class="promo-header__content-inner promo-header__content-inner--center">
            <h1 class="font--white">Projects near you</h1>
         </div>
        </div>
      </header>
    );
  }
}
