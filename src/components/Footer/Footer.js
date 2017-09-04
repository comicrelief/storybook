import React, { Component } from 'react';
import Menu from "../Menu/Menu";
import './footer.scss'

const styles ={
  footer__branding: {
    height: "20%",
    width: "100px",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
  }
}

class Footer extends Component {

  constructor() {
    super();
    this.copy = 'Comic Relief 2017. Comic Relief, registered charity 326568 (England/Wales); SC039730 (Scotland)';
  }

  render() {

    return (
      <footer style={styles} role="contentinfo">
        <div className="region region-footer cr-footer">
          <Menu type="footer" source={this.props.source}/>
        </div>
        <div className="footer__copyright">
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
