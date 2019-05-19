import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
class EditScreen extends React.Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const author = navigation.getParam('author', 'no author');
        const time = navigation.getParam('time', 'yy-mm-dd');
        const content = navigation.getParam('content', 'data load fail');
        const handleEdit = navigation.getParam('handleEdit', 'function get fail');
        const place = navigation.getParam('place', '');
        this.state = {
            author: author,
            time: time,
            content: content,
            place: place,
            handleEdit: handleEdit
        }
    }
    render() {
        const author = this.state.author;
        const time = this.state.time;
        const content = this.state.content;
        const place = this.state.place;
        const handleEdit = this.state.handleEdit;
        return (
            <>
                <View style={styles.nav}>
                    <TouchableOpacity>
                        <Text style={styles.back}
                            onPress={() => this.props.navigation.navigate('ListScreen')}
                        >
                            Back
                        </Text>
                    </TouchableOpacity>
                    <Text
                        style={styles.title}
                    >
                        Debitis et sa...
                    </Text>
                    <TouchableOpacity>
                        <Text style={styles.back}
                            onPress={async () => {
                                await handleEdit(place, author, time, content)
                                this.props.navigation.navigate('ListScreen')
                            }}
                        >
                            Edit
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <TextInput style={styles.author}
                            onChangeText={text => this.setState({ author: text })}
                        >{author}</TextInput>
                        <TextInput style={styles.time}
                            onChangeText={text => this.setState({ time: text })}
                        >{time}</TextInput>
                    </View>
                    <TextInput style={styles.content} multiline={true} onChangeText={text => this.setState({ content: text })}>
                        {content}
                    </TextInput>
                </View>
            </>
        );
    }
}
const styles = StyleSheet.create({
    author: {
        color: '#666',
        fontSize: 20
    },
    time: {
        color: '#666',
        fontSize: 20
    },
    content: {
        lineHeight: 40,
        fontSize: 25,
    },
    title: {
        fontSize: 28,
        color: 'white',
    },
    container: {
        padding: 15,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
    },
    nav: {
        flexDirection: 'row',
        padding: 15,
        height: 60,
        backgroundColor: '#ffc35f',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    back: {
        fontSize: 26,
        color: 'white',
    },
    edit: {
        fontSize: 26,
        color: 'white',
    }
});
export default EditScreen;