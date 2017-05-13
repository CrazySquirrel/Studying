import React from 'react';

import './css/Footer.css';

import FooterLink from '../FooterLink/FooterLink';

class Footer extends React.Component {
  render() {
    return (
        <nav className="footer">
          <FooterLink status="">All</FooterLink>
          <FooterLink status="false">Active</FooterLink>
          <FooterLink status="true">Complited</FooterLink>
        </nav>
    );
  }
}

export default Footer;
