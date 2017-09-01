import React, { Component } from 'react';
import './footer.scss'

const styles ={
  width: "100vw",
  backgroundColor: "#2B2D2E",
  fontFamily: "Roboto",
  p: {
    fontSize: 15,
    fontWeight: "400",
    color: "#ffffff",
    marginBottom: "1.5vh",
  },
  footer__copyright: {
    backgroundColor: "#484848",
    fontFamily: "Roboto",
    width: "100%",
    border: "none",
    marginBottom: "1vh",
    borderRadius: "3px",
  },
  footer__branding: {
    height: "20%",
    width: "100px",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
  }
}

class Footer extends Component {

  // constructor() {
  //   super();
  //   this.copy = 'Comic Relief 2017. Comic Relief, registered charity 326568 (England/Wales); SC039730 (Scotland)';
  // }

  render() {

    return (
      <footer style={styles} role="contentinfo">
        <div className="region region-footer cr-footer">
          nav
        </div>
        <div style={styles.footer__copyright}>
          <p style={styles.p}>{this.copy}</p>
        </div>
        <div style={styles.footer__branding}>
          <a title="Comic Relief" href="http://www.comicrelief.com/" rel="home" target="_blank">
           <img src="http://www.comicrelief.com/themes/custom/comicrelief/logo.svg"></img>
          </a>
        </div>
      </footer>
    );
  }
}

export default Footer;
