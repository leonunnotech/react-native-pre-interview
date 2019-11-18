import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation-stack'
import Detail from '../../components/Detail';
import Edit from '../../components/Edit';

const DetailStack = createStackNavigator(
    {
        Detail,
        Edit
    },
    {
        initialRouteName: 'Detail',
        mode: 'modal',
        headerMode: 'none'
    }
);

export default DetailStack;