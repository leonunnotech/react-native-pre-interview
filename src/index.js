import React, { Component } from 'react';

import { Provider, } from 'react-redux';
import stores from './stores';
import Layout from './components/layout';
import { MenuProvider } from 'react-native-popup-menu';
import App from './components/app';

export default (props) => (
    <Provider store={stores} >
        <MenuProvider customStyles={{ backdrop: { backgroundColor: 'black', opacity: 0.5 } }} >
            <App />
        </MenuProvider>
    </Provider>
);
