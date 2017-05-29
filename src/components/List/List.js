import React from 'react';

import {connect} from 'react-redux';

import './css/List.css';

import Item from '../Item/Item';

class List extends React.Component {
  render() {
    if (Object.keys(this.props.items).length > 0) {
      return (
          <div className="list">
            {
              this.processItems(this.props.items).filter((v, i, a) => {
                return (
                    i >= this.props.page * this.props.pageCount &&
                    i < (this.props.page + 1) * this.props.pageCount
                );
              }).map((item) => {
                return (
                    <Item key={item._key} {...item}/>
                );
              })
            }
          </div>
      );
    } else {
      return (
          <div></div>
      );
    }
  }

  processItems(items) {
    return Object.keys(items).reduce((_items, key) => {
      const item = items[key];

      item._key = key;

      if (item.status) {
        _items.push(item);
      } else {
        _items.unshift(item);
      }

      return _items;
    }, [])
  }
}

List = connect(
    (state) => {
      return {
        pageCount: state.pageCount,
        page: state.page,
        items: state.items
      };
    }
)(List);

export default List;
