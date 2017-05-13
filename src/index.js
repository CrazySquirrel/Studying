import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';

import Store from './store/Store';

import App from './components/App/App';

import './css/index.css';

ReactDOM.render(
    <Provider store={Store}>
      <App />
    </Provider>,
    document.getElementById('app')
);
