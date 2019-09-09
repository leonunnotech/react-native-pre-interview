import React, { Component } from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { View } from 'react-native';
import {reducer as form} from 'redux-form';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import HomeScreen from './src/screens/Home';
import CreateScreen from './src/screens/Create';
import DetailScreen from './src/screens/bookinfo/Detail';
import UpdateScreen from './src/screens/bookinfo/Update';

import { Buffer } from 'buffer';
global.Buffer = Buffer;

import { URL, URLSearchParams } from 'whatwg-url';
global.URL = URL;
global.URLSearchParams = URLSearchParams;

import RNEventSource from 'react-native-event-source';
global.EventSource = RNEventSource;

import book from './reducers/book';


const TabNavigator = createBottomTabNavigator({
  Home: { screen: HomeScreen },
  CreateScreen: { screen: CreateScreen },
});

const MyStackNavigation  = createStackNavigator({
  Main: {
    screen: TabNavigator
  },
  DetailScreen: {
    screen: DetailScreen
  },
  UpdateScreen: {
    screen: UpdateScreen
},
});

const Navigation=  createAppContainer(MyStackNavigation);

class App extends Component {
  render() {
    const store = createStore(combineReducers({
      book,
      form
    }), {}, applyMiddleware(thunk));
    return (
        <Provider store={store}>
          <View style={{flex: 1}}>
            <Navigation/>
          </View>
        </Provider>
    );
  }
}

export default  App;