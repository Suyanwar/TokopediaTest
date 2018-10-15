import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import reducers from './src/reducers';
import SourcesScreen from './src/screens/SourcesScreen';
import { BASE_URL } from './src/utils/constants'

const client = axios.create({
  baseURL: BASE_URL,
  responseType: 'json'
});

const store = createStore(reducers, applyMiddleware(axiosMiddleware(client)));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SourcesScreen />
      </Provider>
    );
  }
}