import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator
} from 'react-native'
import { Field, reduxForm } from 'redux-form'

const { width } = Dimensions.get('window')

class Form extends React.Component {
  state = {
    loading: false
  }

  onSubmit = formValues => {
    this.props.onSubmit(formValues)
  }

  renderError({ error, touched }) {
    if (touched && error) {
      return <Text style={{ color: 'red' }}>{error}</Text>
    }
  }

  renderInput = ({ input, placeholder, meta }) => {
    return (
      <View>
        <TextInput
          {...input}
          autoComplete="off"
          placeholder={placeholder}
          style={{
            borderWidth: 1,
            borderColor: '#f0f0f0',
            borderRadius: 5,
            backgroundColor: '#fff',
            padding: 10,
            marginBottom: 15
          }}
        />
        <View style={{ marginBottom: 10 }}>{this.renderError(meta)}</View>
      </View>
    )
  }

  renderButton() {
    if (this.props.loading) {
      return <ActivityIndicator size="large" style={{ marginTop: 20 }} />
    }
    return (
      <TouchableOpacity
        onPress={this.props.handleSubmit(this.onSubmit)}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FDC268',
          marginTop: 20,
          height: width / 8,
          borderRadius: 5
        }}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>Submit</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View>
        <Field name="title" placeholder="Title" component={this.renderInput} />
        <Field
          name="author"
          placeholder="Author"
          component={this.renderInput}
        />
        <Field
          name="publicationDate"
          placeholder="Created at"
          component={this.renderInput}
        />
        <Field name="isbn" placeholder="ISBN" component={this.renderInput} />
        <Field
          name="description"
          placeholder="Description"
          component={this.renderInput}
        />
        {this.renderButton()}
      </View>
    )
  }
}

const validate = formValues => {
  const errors = {}

  if (!formValues.title) {
    errors.title = 'You must enter a title'
  }

  if (!formValues.author) {
    errors.author = 'You must enter an author'
  }

  if (!formValues.publicationDate) {
    errors.publicationDate = 'You must enter a publicationDate'
  }

  if (!formValues.isbn) {
    errors.isbn = 'You must enter a ISBN'
  }

  if (!formValues.description) {
    errors.description = 'You must enter a description'
  }

  return errors
}

export default reduxForm({
  form: 'Form',
  validate
})(Form)
