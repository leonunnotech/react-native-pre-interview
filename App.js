import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import HomeScreen from './src/screens/HomeScreen'
import DetailsScreen from './src/screens/DetailsScreen'
import CreateScreen from './src/screens/CreateScreen'
import EditScreen from './src/screens/EditScreen'
import reducers from './src/reducers'

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Details: DetailsScreen,
  Create: CreateScreen,
  Edit: EditScreen
})

const Navigation = createAppContainer(AppNavigator)
const store = createStore(reducers, applyMiddleware(thunk))

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    )
  }
}
