import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

import Form from '../components/Form'
import { createBook } from '../actions'

class CreateScreen extends React.Component {
  static navigationOptions = {
    title: 'Add New Book',
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
    await this.props.createBook(formValues)
    this.props.navigation.goBack()
    this.setState({ loading: false })
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f5f5f5', padding: 20 }}>
        <Form loading={this.state.loading} onSubmit={this.onSubmit} />
      </View>
    )
  }
}

export default connect(
  null,
  { createBook }
)(CreateScreen)
