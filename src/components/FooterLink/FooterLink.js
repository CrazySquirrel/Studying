import React from 'react';

import {connect} from 'react-redux';
import {filterByStatus} from '../../action/Action';

import './css/FooterLink.css';

class FooterLink extends React.Component {
  render() {
    if (this.props.active) {
      return (
          <span className="footer_link">{this.props.children}</span>
      );
    } else {
      return (
          <a className="footer_link"
             href="#"
             onClick={(e) => {
               e.preventDefault();
               this.props.onClick();
             }}
          >
            {this.props.children}
          </a>
      );
    }
  }
}

FooterLink = connect(
    (state, ownProps) => {
      return {
        active: ownProps.status === state.filterStatus
      }
    },
    (dispatch, ownProps) => {
      return {
        onClick: () => {
          dispatch(filterByStatus(ownProps.status))
        }
      }
    }
)(FooterLink);

export default FooterLink;