import React, {Component} from 'react';

import {connect} from 'react-redux';

import './css/App.css';

import Header from '../Header/Header';

import List from '../List/List';

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
          <p>
            Done: {done} Left: {left} Total: {total}
          </p>
          <List />
          <Footer />
        </div>
    );
  }
}

App = connect(
    (state) => {
      return {
        items: state.items
      };
    }
)(App);

export default App;
