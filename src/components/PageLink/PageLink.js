import React from 'react';

import {connect} from 'react-redux';
import {pagination} from '../../action/Action';

import './css/PageLink.css';

class PageLink extends React.Component {
  render() {
    if (this.props.active) {
      return (
          <span className="page_link">{this.props.children}</span>
      );
    } else {
      return (
          <a className="page_link"
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

PageLink = connect(
    (state, ownProps) => {
      return {
        active: ownProps.page === state.page
      }
    },
    (dispatch, ownProps) => {
      return {
        onClick: () => {
          dispatch(pagination(ownProps.page))
        }
      }
    }
)(PageLink);

export default PageLink;