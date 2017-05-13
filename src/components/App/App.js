import React, {Component} from 'react';

import './css/App.css';

import Header from '../Header/Header';

import List from '../List/List';

import Footer from '../Footer/Footer';

import Filter from '../Filter/Filter';

class App extends Component {
  render() {
    return (
        <div className="app">
          <Header />
          <Filter />
          <List />
          <Footer />
        </div>
    );
  }
}

export default App;
