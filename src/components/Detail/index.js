import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { Container, Header, View, Content, Body, Title, Left, Right, Icon, Input, Text, Button } from 'native-base';
import { HeaderView } from '../common';
import { connect } from 'react-redux'
import {getBookById, getBooks} from "../../actions";
import {TimeStamp} from '../../functions/timeStamp';


const styles = StyleSheet.create({
    content: {
        margin: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

class Detail extends Component {
    
    constructor(props) {
        super(props);
        const {getBookById, Book} = this.props; 
        getBookById(Book.id);
    }

    handleOnBack = () => {
        const {getBooks, navigation} = this.props;
        navigation.navigate('Library');
        getBooks();
    }

    handleOnPress = () => {
        const {Book, navigation} = this.props;
        let current = Book.current;
        navigation.navigate('Edit');
    }

    render () {
        const { Book, navigation, getBookById } = this.props;
        let current = Book.current;
        return (
            current ? <Container>
                <HeaderView onPress={() => this.handleOnBack()} title={current.title} 
                    right={
                        <Button transparent light onPress={() => this.handleOnPress()}>
                            <Text>Edit</Text>
                        </Button>
                    }
                />
                    <Content >
                        {console.log(current)}
                        <View style={{flexDirection: "row", margin: 20}}>
                            <Left><Text style={{fontSize: 14}}>Author: {current.author}</Text></Left>
                            <Right><Text style={{fontSize: 14}}>{TimeStamp(current.publicationDate)}</Text></Right>
                        </View>
                        <Body style={styles.content}><Text>{current.description}</Text></Body>
                    </Content>
            </Container>:
            <Container>
                <HeaderView onPress={() => this.handleOnBack()} title={''} />
                <Content>
                    <View style={{marginTop: 10}}>
                        <ActivityIndicator animating size="large" />
                    </View>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = ({ Book, Review }) => ({ Book, Review });
  
export default connect(mapStateToProps, {getBookById, getBooks})(Detail);