import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

import { editBook } from '../actions'
import Form from '../components/Form'

class EditScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#FDC268'
    },
    headerTintColor: '#fff'
    // headerRight: <Button title="Save" color="#fff" />
  }

  state = {
    loading: false
  }

  onSubmit = async formValues => {
    this.setState({ loading: true })
    await this.props.editBook(
      this.props.navigation.state.params['@id'],
      formValues
    )
    this.props.navigation.navigate('Home')
    this.setState({ loading: false })
  }

  render() {
    const {
      isbn,
      title,
      author,
      publicationDate,
      description
    } = this.props.navigation.state.params

    return (
      <View style={{ flex: 1, padding: 20 }}>
        <Form
          loading={this.state.loading}
          onSubmit={this.onSubmit}
          initialValues={{ isbn, title, author, publicationDate, description }}
        />
      </View>
    )
  }
}

export default connect(
  null,
  { editBook }
)(EditScreen)
