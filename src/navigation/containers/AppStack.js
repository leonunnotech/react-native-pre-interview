import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation-stack'
import Library from '../../components/Library';
import DetailStack from './DetailStack';
import Edit from '../../components/Edit';

const AppStack = createStackNavigator(
    {
        Library: { screen: Library },
        DetailStack: { screen: DetailStack },
        Add: { screen: Edit }
    },
    {
        mode: 'modal',
        headerMode: 'none'
    }
);

export default AppStack;