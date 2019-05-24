import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {NavigationEvents} from 'react-navigation';
import { fetchBook } from '../BookActions';

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <Button
          onPress={() => navigation.navigate('AddAndEditBook')}
          title="New"
          color="#fff"
        />
      ),
    };
  }

  state = {
    isLoading: true,
  }

  componentDidMount(){
    return fetch('https://demo.api-platform.com/books')
      .then((response) =>response.json())
      .then((responseJson) => {
        this.props.fetchBook(responseJson["hydra:member"])
      })
      .catch((error) =>{
        alert('error')
      });
  }

  fetchData = () => {
    return fetch('https://demo.api-platform.com/books')
      .then((response) =>response.json())
      .then((responseJson) => {
        this.props.fetchBook(responseJson["hydra:member"])
      })
      .catch((error) =>{
        alert('error')
      });
  }

  render() {
    if(this.props.books.length === 0){
      return( 
        <View style={styles.loader}> 
          {/* <ActivityIndicator size="large" color="#0c9"/> */}
          <Text style={styles.description}>loading...</Text>
        </View>
    )}
    return (
      <ScrollView>
        <NavigationEvents onDidFocus={() => this.fetchData()} />
        <View style={styles.container}>
          {        
            this.props.books.map((item, index)=>
              <TouchableOpacity 
                style={styles.card} 
                key={item["@id"]}
                onPress={() => this.props.navigation.navigate('Details', { title: `${item.title}`, index: index})}> 
                  <View style={styles.cardContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                    <Text style={styles.author}>by {item.author}</Text>
                    <Text style={styles.author}>{item.publicationDate.slice(0, 10)}</Text>
                  </View> 
                </TouchableOpacity>
            )
          }    
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.bookReducer.books
  }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchBook,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    flexWrap:'wrap',
    width: '100%', 
    height: '100%',
  },
  card: {
    backgroundColor: '#FFFFFF',
      width: '44%', 
      margin: '3%', 
      aspectRatio: 1,
  },
  cardContainer: {
    padding: 10,
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    height: '25%',
    textAlign: 'center',
  },
  description: {
    marginTop: 10,
    marginBottom: 10,
    height: '40%',
    color: '#AEAEAE',
  },
  author: {
    height: '15%',
    color: '#AEAEAE',
  },
})