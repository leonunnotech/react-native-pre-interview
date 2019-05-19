import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput
} from 'react-native';
class NewbookScreen extends React.Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const author = navigation.getParam('author', 'no author');
        const time = navigation.getParam('time', 'yy-mm-dd');
        const content = navigation.getParam('content', 'data load fail');
        const handleNewCard = navigation.getParam('handleNewCard', 'function get fail');
        this.state = {
            author: author,
            time: time,
            content: content,
            handleNewCard: handleNewCard
        }
    }
    render() {
        const handleNewCard = this.state.handleNewCard;
        return (
            <>
                <View style={styles.nav}>
                    <TouchableOpacity>
                        <Text style={styles.back}
                            onPress={() => this.props.navigation.navigate('ListScreen')}>Back
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Add new book</Text>
                    <TouchableOpacity>
                        <Text style={styles.save}
                            onPress={async () => {
                                handleNewCard(this.state.author, this.state.time, this.state.content)
                                this.props.navigation.navigate('ListScreen')
                            }}>Save
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TextInput
                        style={{ height: 40, ...styles.textInput }}
                        placeholder={'Author'}
                        onChangeText={text => this.setState({ author: text })}
                    />
                    <TextInput
                        style={{ height: 40, ...styles.textInput }}
                        placeholder={'Crerated at'}
                        onChangeText={text => this.setState({ time: text })}
                    />
                    <TextInput
                        style={{ height: 150, ...styles.textInput }}
                        onChangeText={text => this.setState({ content: text })}
                    />
                </View>
            </>
        );
    }
}
const styles = StyleSheet.create({
    textInput: {
        color: '#ccc',
        borderRadius: 5,
        paddingLeft: 5,
        padding: 5,
        fontSize: 23,
        borderWidth: 1,
        borderColor: '#ccc',
        margin: 10,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        color: 'white',
    },
    container: {
        padding: 20,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
    },
    nav: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#ffc35f',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15
    },
    back: {
        fontSize: 26,
        color: 'white',
    },
    save: {
        fontSize: 26,
        color: 'white',
    }
});
export default NewbookScreen;