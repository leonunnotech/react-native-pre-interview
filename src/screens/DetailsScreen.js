import React from 'react'
import { View, Text, Button } from 'react-native'

class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title,
      headerStyle: {
        backgroundColor: '#FDC268'
      },
      headerTintColor: '#fff',
      headerRight: (
        <Button
          title="Edit"
          color="#fff"
          onPress={() =>
            navigation.navigate('Edit', {
              ...navigation.state.params
            })
          }
        />
      )
    }
  }

  render() {
    const {
      author,
      publicationDate,
      description
    } = this.props.navigation.state.params

    return (
      <View style={{ flex: 1, padding: 10 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10
          }}
        >
          <Text>{`Author: ${author}`}</Text>
          <Text>{publicationDate.slice(0, 10)}</Text>
        </View>
        <Text>{description}</Text>
      </View>
    )
  }
}

export default DetailsScreen
