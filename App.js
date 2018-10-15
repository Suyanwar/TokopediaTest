import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import { createStackNavigator } from 'react-navigation';

import reducers from './src/reducers';
import SourcesScreen from './src/screens/SourcesScreen';
import ArticlesScreen from './src/screens/ArticlesScreen';
import WebViewScreen from './src/screens/WebViewScreen';
import { BASE_URL } from './src/utils/constants'

const client = axios.create({
  baseURL: BASE_URL,
  responseType: 'json'
});

const store = createStore(reducers, applyMiddleware(axiosMiddleware(client)));

const Stack = createStackNavigator({
  SourcesScreen: {
    screen: SourcesScreen
  },
  ArticlesScreen: {
    screen: ArticlesScreen
  },
  WebViewScreen: {
    screen: WebViewScreen
  }
});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Stack />
      </Provider>
    );
  }
}