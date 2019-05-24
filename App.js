import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import bookReducer from './BookReducer';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailScreen'
import AddAndEditBookScreen from './screens/AddAndEditBookScreen'

const store = createStore(bookReducer);

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
    AddAndEditBook: AddAndEditBookScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#FFC35F',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
      },
    },
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <AppContainer />
      </Provider>
    )
  }
}