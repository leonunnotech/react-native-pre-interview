import { View, StatusBar, StyleSheet, SafeAreaView, Header } from "react-native";
import React, {Component} from "react";
import { Root, StyleProvider, Text } from 'native-base';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'transparent'
    }
})

class Layout extends Component {
    render () {
        return (
            <StyleProvider>
                <Root style={styles.wrapper}>
                    <View style={{ flex: 1 }}>
                        <StatusBar barStyle="light-content" />
                    </View>
                </Root>
            </StyleProvider>
        );    
    }
}

export default Layout;