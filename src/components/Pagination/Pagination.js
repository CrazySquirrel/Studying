import React from 'react';

import {connect} from 'react-redux';

import './css/Pagination.css';

import PageLink from '../PageLink/PageLink';

class Pagination extends React.Component {
  render() {
    return (
        <nav className="pagination">
          {[...Array(this.props.pages)].map((v, i) => {
            return (
                <PageLink key={i} page={i}>{i + 1}</PageLink>
            );
          })}
        </nav>
    );
  }
}

Pagination = connect(
    (state) => {
      return {
        pages: Math.ceil(Object.keys(state.items).length / state.pageCount)
      };
    }
)(Pagination);

export default Pagination;
