import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, CardItem, View, Thumbnail, Text, Button, Icon, Left, Right, Body } from 'native-base';

const styles = StyleSheet.create({
    cardBody: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

class LibCard extends Component {
    render() {
        const {id, title, content, publish, author, onPress} = this.props;
        return (
            <TouchableOpacity key={id} onPress={onPress}> 
                <Card padder style={{minHeight: 150, maxHeight: 200 }}>
                    <CardItem header>
                        <Body style={styles.cardBody}>
                            <Text>{title}</Text>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Body style={styles.cardBody}>
                            <Text>
                                {content.length > 30 ? content.substring(0, 30) + '...' : content}
                            </Text>
                        </Body>
                    </CardItem>
                    <CardItem footer>
                        <Left><Text style={{fontSize: 9}}>By {author}</Text></Left>
                        <Right><Text style={{fontSize: 9}}>{publish}</Text></Right>
                    </CardItem>
                </Card>
            </TouchableOpacity>
        );
    }
}


export default LibCard;