import React, {Component} from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import AppStack from './AppStack';

export default createAppContainer(
    createSwitchNavigator(
        {
            App: AppStack
        },
        {
            initialRouteName: 'App'
        }
    )
)