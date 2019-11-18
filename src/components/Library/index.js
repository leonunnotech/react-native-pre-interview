import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { Container, View, Text, Button } from 'native-base';
import { HeaderView } from '../common';
import { connect } from 'react-redux'
import {getBooks, setCurrentId, goToAddForm} from "../../actions";
import LibCard from '../LibCard';
import {TimeStamp} from '../../functions/timeStamp';
import _ from 'lodash';

const ITEMS_PER_PAGE = 12;

class Library extends Component {
    
    constructor(props) {
        super(props);
        const {getBooks, Book} = this.props; 
        getBooks();
        this.state = {
            start: 0,
            end: ITEMS_PER_PAGE,
            refreshing: false,
            page: 1,
            data: Book.payload
        }
    }
    componentDidUpdate(previousProps, previousState){}

    handleOnClick = (id) => {
        const {navigation, setCurrentId} = this.props;
        setCurrentId(id);
        navigation.navigate('DetailStack');
    }

    handleOnPress = () => {
        const {goToAddForm, navigation} = this.props;
        goToAddForm('add');
        navigation.navigate('Add');
    } 

    handleLoadMore = () => {
        const {data, page} = this.state;
        const {Book} = this.props;
        getBooks({page: page + 1});

        this.setState({ page: page + 1, data: _.merge(data, Book.payload) });
    }

    renderFooter = () => {
        return (
            <View style={{marginTop: 10}}>
                <ActivityIndicator animating size="large" />
            </View>
        );
    };

    render () {
        const { Book } = this.props;
        const { data } = this.state;
        let books = Book.payload;

        return (
            <Container>
                <HeaderView title={''} right={
                        <Button transparent light onPress={() => this.handleOnPress()}>
                            <Text>Add</Text>
                        </Button>
                    }/>
                    <View>
                        <FlatList
                            data={books}
                            renderItem={({item}) => 
                                <View key={item['id']} style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                                    <LibCard 
                                        key={item['id']} 
                                        title={'X'} 
                                        content={item.description} 
                                        publish={TimeStamp(item.publicationDate)} 
                                        author={item.author}
                                        onPress={() => this.handleOnClick(item['id'])}
                                    />
                                </View>
                            }
                            numColumns={2}
                            onEndReachedThreshold={0.5}
                            onEndReached={() => this.handleLoadMore()}
                            ListFooterComponent={this.renderFooter}
                            extraData={books}
                            // refreshing={this.state.refreshing}
                            // onRefresh = {}
                        />
                    </View>
            </Container>
        )
    }
}

const mapStateToProps = ({ Book, Review }) => ({ Book, Review });
  
export default connect(mapStateToProps, {getBooks, setCurrentId, goToAddForm})(Library);