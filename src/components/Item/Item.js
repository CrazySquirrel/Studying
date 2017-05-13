import React from 'react';

import {connect} from 'react-redux';
import {toggleStatus} from '../../action/Action';

import Tags from '../Tags/Tags';

import './css/Item.css';

class Item extends React.Component {
  render() {
    return (
        <div
            data-status={this.props.status}
            className="item"
        >
          <span
              className="item_status"
              onClick={(e) => {
                e.preventDefault();
                this.props.onClick();
              }}
          >
          </span>
          <h2>
            <a href={this.props.link} target="_blank">
              {this.props.name}
            </a>
          </h2>
          <Tags tags={this.props.tags}/>
          <p className="item_description">{this.props.description}</p>
        </div>
    );
  }
}

Item = connect(
    (state, ownProps) => {
      return {}
    },
    (dispatch, ownProps) => {
      return {
        onClick: () => {
          dispatch(toggleStatus(ownProps._key))
        }
      }
    }
)(Item);

export default Item;