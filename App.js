import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import ListScreen from './screens/listScreen.js';
import EditScreen from './screens/editScreen.js';
import newBookScreen from './screens/newBookScreen.js';
const RootStack = createStackNavigator(
  {
    ListScreen: {
      screen: ListScreen,
      navigationOptions: {
        header: null
      },
    },
    newBookScreen: {
      screen: newBookScreen,
      navigationOptions: {
        header: null
      },
    },
    EditScreen: {
      screen: EditScreen,
      navigationOptions: {
        header: null
      },
    }
  }, {
    initialRouteName: 'ListScreen'
  }
)
const App = createAppContainer(RootStack);
export default App;

