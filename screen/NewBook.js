import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput } from 'react-native';


export default class NewBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            author: "",
            publicationDate: "",
            description: ""
        }
    }



    render() {
        const description = this.props.navigation.getParam('description', '');
        const author = this.props.navigation.getParam('author', '');
        const publicationDate = this.props.navigation.getParam('publicationDate', '');

        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.contextText}
                    onChangeText={(author) => this.setState({ author })}
                    placeholder='Author'
                    value={this.state.author} />
                <TextInput
                    style={styles.contextText}
                    onChangeText={(publicationDate) => this.setState({ publicationDate })}
                    placeholder='Created at'
                    value={this.state.publicationDate} />
                <TextInput
                    style={styles.description}
                    onChangeText={(description) => this.setState({ description })}
                    value={this.state.description}
                    multiline={true} />
            </View>
        );
    }

    componentWillMount() {
        this.props.navigation.setParams({
            save: this.goSave,
            back: this.goBack
        });
    }

    goSave = () => {
        //this.props.navigation.navigate('AddAndEditBook');
    }

    goBack = () => {
        this.props.navigation.goBack();
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: "Add new book",
            headerRight: (
                <Text
                    style={styles.bar}
                    onPress={navigation.getParam('save')}>
                    Save
                </Text>
            ),
            headerLeft: (
                <Text
                    style={styles.bar}
                    onPress={navigation.getParam('back')}>
                    Back
                </Text>
            ),
        };
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F5F5',
        width: '100%',
        height: '100%',
    },
    bar: {
        fontSize: 16,
        color: '#FFFFFF',
        margin: 10,
    },
    contextText: {
        margin: 10,
        backgroundColor: "#FFFFFF",
    },
    description: {
        margin: 10,
        backgroundColor: "#FFFFFF",
        height: 50,
    },
});
