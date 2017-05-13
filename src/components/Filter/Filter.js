import React from 'react';

import {connect} from 'react-redux';
import {filterByText} from '../../action/Action';

import './css/Filter.css';

import Tags from '../Tags/Tags';

class Filter extends React.Component {
  render() {
    return (
        <div className="filter">
          <Tags tags={this.props.tags}/>
          <input
              placeholder="Find by text"
              className="filter_input"
              type="search"
              onKeyUp={() => {
                this.props.onKeyUp(this.textInput.value);
              }}
              onChange={() => {
                this.props.onKeyUp(this.textInput.value);
              }}
              ref={(input) => {
                this.textInput = input;
              }}
          />
        </div>
    );
  }

  componentDidMount() {
    this.textInput.value = this.props.filterText;
  }
}

Filter = connect(
    (state) => {
      return {
        tags: Object.keys(state.filterTags),
        filterText: state.filterText
      };
    },
    (dispatch, ownProps) => {
      return {
        onKeyUp: (value) => {
          dispatch(filterByText(value))
        }
      }
    }
)(Filter);

export default Filter;