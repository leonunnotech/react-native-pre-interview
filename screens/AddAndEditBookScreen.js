import React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchBook } from '../BookActions';

class AddAndEditBookScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add new book',
      headerStyle: {
        backgroundColor: '#FFC35F',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20, 
      },
      headerRight: (
        <Button
          onPress={navigation.getParam('addAndEditBook')}
          title="Save"
          color="#fff"
        />
      ),
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ addAndEditBook: this._addAndEditBook });
    const index = this.props.navigation.getParam('index');
    if (index !== undefined) {
      this.setState({
        title: this.props.books[index].title,
        author: this.props.books[index].author,
        publicationDate: this.props.books[index].publicationDate.slice(0, 10),
        description: this.props.books[index].description,
        id: this.props.books[index]["@id"],
      }, function(){
      });
    }
  }

  state = {
    title: '',
    author: '',
    publicationDate: '',
    description: '',
    id: '',
  }

  _addAndEditBook = () => {
    const index = this.props.navigation.getParam('index');
    if (index !== undefined) {
      return fetch(`https://demo.api-platform.com${this.state.id}`,{ 
          method: 'PATCH',
          headers:{
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({
            title: this.state.title,
            author: this.state.author,
            publicationDate: this.state.publicationDate,
            description: this.state.description,
          })
      })
      .then((response) =>response.json())
      .then((responseJson) => {
        this.props.navigation.navigate('Home')
      })
      .catch((error) =>{
        alert('error')
      });  
    } else {
      return fetch('https://demo.api-platform.com/books',{ 
          method: 'POST',
          headers:{
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({
            title: this.state.title,
            author: this.state.author,
            publicationDate: this.state.publicationDate,
            description: this.state.description,
          })
      })
      .then((response) =>response.json())
      .then((responseJson) => {
        this.props.navigation.navigate('Home')
      })
      .catch((error) =>{
        alert('error')
      });  
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.title}
          onChangeText={(title) => this.setState({title})}
          placeholder='Title'
          value={this.state.title}
        />
        <TextInput
          style={styles.author}
          onChangeText={(author) => this.setState({author})}
          placeholder='Author'
          value={this.state.author}
        />
        <TextInput
          style={styles.publicationDate}
          onChangeText={(publicationDate) => this.setState({publicationDate})}
          placeholder='Created at'
          value={this.state.publicationDate}
        />
        <View style={styles.descriptionContainer}>
          <TextInput
            style={styles.description}
            onChangeText={(description) => this.setState({description})}
            maxLength = {40}
            placeholder='Created at'
            value={this.state.description}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.bookReducer.books
  }
};

export default connect(mapStateToProps)(AddAndEditBookScreen);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F5F5',
    height: '100%',
  },
  title: {
    fontSize: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    height: 40,
    paddingLeft: 10,
  },
  author: {
    fontSize: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    height: 40,
    paddingLeft: 10,
  },
  publicationDate: {
    fontSize: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    height: 40,
    paddingLeft: 10,
  },
  descriptionContainer: {
    backgroundColor: '#FFFFFF',
    height: 100,
  },
  description: {
    padding: 10,
  },
})