import React, {Component} from 'react';

import {connect} from 'react-redux';

import './css/App.css';

import Header from '../Header/Header';

import List from '../List/List';

import Pagination from '../Pagination/Pagination';

import Footer from '../Footer/Footer';

import Filter from '../Filter/Filter';

class App extends Component {
  render() {
    let done = 0;
    let left = 0;
    let total = 0;

    Object.keys(this.props.items).forEach((key) => {
      total++;

      if (this.props.items[key].status) {
        done++;
      } else {
        left++;
      }
    });

    return (
        <div className="app">
          <Header />
          <Filter />
          <p className="app_stat">
            Done: {done} Left: {left} Total: {total}
          </p>
          <p className="app_stat">
            Page: {this.props.page + 1}:{this.props.pages}&nbsp;
            Courses: {this.props.page * this.props.pageCount + 1}
            : {Math.min((this.props.page + 1) * this.props.pageCount,
              Object.keys(this.props.items).length)}
          </p>
          <Pagination />
          <List />
          <Pagination />
          <Footer />
        </div>
    );
  }
}

App = connect(
    (state) => {
      return {
        pages: Math.ceil(Object.keys(state.items).length / state.pageCount),
        pageCount: state.pageCount,
        page: state.page,
        items: state.items
      };
    }
)(App);

export default App;
