import React from 'react';

import {connect} from 'react-redux';
import {filterByTags} from '../../action/Action';

import './css/Tag.css';

class Tag extends React.Component {
  render() {
    return (
        <span data-active={this.props.active}
              className="tag"
              onClick={(e) => {
                e.preventDefault();
                this.props.onClick();
              }}
        >
          {this.props.tag}
        </span>
    );
  }
}

Tag = connect(
    (state, ownProps) => {
      return {
        active: state.filterTags[ownProps.tag]
      }
    },
    (dispatch, ownProps) => {
      return {
        onClick: () => {
          dispatch(filterByTags(ownProps.tag))
        }
      }
    }
)(Tag);

export default Tag;