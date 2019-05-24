import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.state.params.title}`,
      headerRight: (
        <Button
          onPress={() => navigation.navigate('AddAndEditBook',{ index: navigation.state.params.index})}
          title="Edit"
          color="#fff"
        />
      ),
    };
  }

  render() {
    const index = this.props.navigation.getParam('index');
    const book = this.props.books[index]
    return (
      <View style={styles.container}>
        <View style={styles.subTitle}>
          <Text style={styles.author}>{book.author}</Text>
          <Text style={styles.date}>{book.publicationDate.slice(0, 10)}</Text>
        </View>
        <Text style={styles.description}>{book.description}</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.bookReducer.books
  }
};

export default connect(mapStateToProps)(DetailsScreen);

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  subTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  author: {
    color: '#AEAEAE',
  },
  date: {
    color: '#AEAEAE',
  },
  description: {
    fontSize: 20,
    marginTop: 10,
  },
})