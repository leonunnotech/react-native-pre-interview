import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { Container, View, Content, Body, DatePicker, Textarea, Form, Item, Input, Text, Button } from 'native-base';
import { HeaderView } from '../common';
import { connect } from 'react-redux'
import {getBooks, getBookById, updateBookById, setCurrentId, addBook} from "../../actions";
import {TimeStamp} from '../../functions/timeStamp';


const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    input: {
        marginTop: 20
    }
})

class Edit extends Component {
    
    constructor(props) {
        super(props);
        const {getBookById, Book} = this.props; 
        getBookById(Book.id);
        this.state = {
            author: Book && Book.current && Book.current.author || '',
            content: Book && Book.current && Book.current.description || '',
            chosenDate: new Date(TimeStamp(Book && Book.current && Book.current.publicationDate)) || '',
            title: undefined
        }
        this.setDate = this.setDate.bind(this);
    }

    handleOnBack = () => {
        const {Book, navigation, getBooks} = this.props;
        if (Book.status && Book.status === 'add') {
            getBooks();
        }
        navigation.goBack();
    }

    handleOnSave = () => {
        const {Book, navigation, updateBookById, getBooks, getBookById, setCurrentId, addBook} = this.props;
        const {author, content, chosenDate, title} = this.state;
        let current = Book.current;

        let payload = {
            description: content,
            author: author,
            publicationDate: new Date(chosenDate.toISOString())
        }
        if (title) {
            payload.title = title;
        }
        if (Book.status && Book.status === 'add') {
            addBook(payload);
            getBooks();
            navigation.goBack();
        }
        else {
            let oldId = current.id;
            updateBookById(oldId, payload);
            getBookById(oldId);
            navigation.goBack();
        }
    }

    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }

    render () {
        const { Book, navigation, getBookById } = this.props;
        const {author, content, chosenDate, title} = this.state;
        let current = Book.current;
        let status = Book.status;

        return (
            current ? <Container>
                <HeaderView onPress={() => this.handleOnBack()} title={current.title} 
                    right={
                        <Button transparent light onPress={() => this.handleOnSave()}>
                            <Text>Save</Text>
                        </Button>
                    }
                />
                    <Content style={styles.form}>
                        <Item regular>
                            <Input value={author} placeholder={'Create Author'} onChangeText={(author) => this.setState({author})}/>
                        </Item>
                        <Item style={styles.input} regular>
                            <DatePicker
                                defaultDate={chosenDate}
                                modalTransparent={true}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderTextStyle={{ color: "#d3d3d3" }}
                                onDateChange={this.setDate}
                                disabled={false}
                            />
                        </Item>
                        <Form style={styles.input} >
                            <Textarea rowSpan={5} bordered onChangeText={(content) => this.setState({content})} value={content}/>
                        </Form>
                    </Content>
            </Container>:
            status === 'add' && <Container>
                <HeaderView onPress={() => this.handleOnBack()} title={'Add new book'} 
                    right={
                        <Button transparent light onPress={() => this.handleOnSave()}>
                            <Text>Save</Text>
                        </Button>
                    }
                />
                <Content style={styles.form}>
                    <Item regular>
                        <Input value={author} placeholder={'Author'} onChangeText={(author) => this.setState({author})}/>
                    </Item>
                    <Item style={styles.input} regular>
                        <Input value={title} placeholder={'Title'} onChangeText={(title) => this.setState({title})}/>
                    </Item>
                    <Item style={styles.input} regular>
                        <DatePicker
                            defaultDate={chosenDate}
                            modalTransparent={true}
                            animationType={"fade"}
                            androidMode={"default"}
                            placeHolder={"Created at"}
                            placeHolderTextStyle={{ color: "#d3d3d3" }}
                            onDateChange={this.setDate}
                            disabled={false}
                        />
                    </Item>
                    <Form style={styles.input} >
                        <Textarea rowSpan={5} bordered onChangeText={(content) => this.setState({content})} value={content}/>
                    </Form>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = ({ Book, Review }) => ({ Book, Review });
  
export default connect(mapStateToProps, {getBooks, getBookById, setCurrentId, updateBookById, addBook})(Edit);