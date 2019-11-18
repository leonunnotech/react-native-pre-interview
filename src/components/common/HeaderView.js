import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import { Header, Left, Right, Body, Button, Title, Text } from 'native-base';

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    header: {
        backgroundColor: '#ff9600'
    },
    headerBody: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    headerTitle: {
        fontSize: 18,
        color: 'white'
    }
})

class HeaderView extends React.Component {
    render () {
        const {onPress, title, right, left, headerStyle} = this.props;
        return (
            <Header style={[styles.header, headerStyle]} >
                <Left style={{marginLeft: 8}}>
                    {onPress &&
                        <Button transparent light onPress={onPress}>
                            <Text>Back</Text>
                        </Button>
                    }
                </Left>
                <Body style={styles.headerBody}>
                    <Title style={styles.headerTitle}>{title}</Title>
                </Body>
                <Right >
                    {right}
                </Right>
            </Header>
        )
    }
}

export default HeaderView;