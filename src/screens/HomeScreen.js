import React from 'react'
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Button
} from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'
import { SafeAreaView } from 'react-navigation'

import { fetchBooks } from '../actions'

const { width } = Dimensions.get('window')

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: '#FDC268'
      },
      headerTintColor: '#fff',
      headerRight: (
        <Button
          title="New"
          color="#fff"
          onPress={() => navigation.navigate('Create')}
        />
      )
    }
  }

  constructor(props) {
    super(props)

    this.page = 0
    this.state = {
      books: [],
      booksToShow: [],
      loading: true
    }
  }

  async componentDidMount() {
    await this.props.fetchBooks()
    this.setState(
      {
        books: _.chunk(this.props.books, 6),
        loading: false
      },
      () => this.setState({ booksToShow: this.state.books[this.page] })
    )
  }

  goToPageTwo = book => {
    this.props.navigation.navigate('Details', {
      ...book
    })
  }

  handleLoadMore = () => {
    this.page += 1
    this.setState(prevState => {
      return {
        booksToShow: prevState.booksToShow.concat(this.state.books[this.page])
      }
    })
  }

  renderBooks() {
    return this.state.booksToShow.map(book => {
      if (this.state.booksToShow.length <= this.props.books.length) {
        return (
          <TouchableOpacity
            onPress={() => this.goToPageTwo(book)}
            style={{
              width: width / 2 - 30,
              height: width / 2 - 30,
              backgroundColor: 'white',
              marginLeft: 20,
              marginTop: 20,
              borderRadius: 3,
              padding: 10,
              justifyContent: 'space-around'
            }}
            key={book.title}
          >
            <Text>{book.title}</Text>
            <View>
              <Text>{`By ${book.author}`}</Text>
              <Text>{book.publicationDate.slice(0, 10)}</Text>
            </View>
          </TouchableOpacity>
        )
      }
    })
  }

  renderButton() {
    if (
      this.state.loading ||
      this.state.booksToShow.length >= this.props.books.length
    ) {
      return null
    }
    return (
      <TouchableOpacity
        onPress={() => this.handleLoadMore()}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FDC268',
          margin: 20,
          height: width / 8,
          borderRadius: 5
        }}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>Load More</Text>
      </TouchableOpacity>
    )
  }

  render() {
    if (this.state.loading) {
      return <ActivityIndicator size="large" style={{ marginTop: 20 }} />
    }

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        <ScrollView>
          <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row' }}>
            {this.renderBooks()}
          </View>
          {this.renderButton()}
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  return { books: state.books }
}

export default connect(
  mapStateToProps,
  { fetchBooks }
)(HomeScreen)
