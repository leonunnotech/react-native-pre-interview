import React, {Component} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

class listItem extends Component{

  render () {

    return(
      <TouchableOpacity onPress={this.props.onItemPressed}>
        <View style={styles.listItem}>
          <Image resizeMode="cover" source={require('../../photo/book.jpg')} style={styles.placeImage} />
          <View style={{flex: 1}}>
            <Text style={styles.itemTitle}>{this.props.bookTitle}</Text>
            <Text>Id: {this.props.bookKey}</Text>
            <Text>Author: {this.props.bookAuthor}</Text>
            <Text>Description: {this.props.bookDescription}</Text>
            <Text>PublicationDate: {this.props.bookPublicationDate}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  };
}



const styles = StyleSheet.create({
  listItem: {
    marginTop: 5,
    width: "100%",
    marginBottom: 5,
    padding: 10,
    backgroundColor: "#eee",
    flexDirection: "row",
    alignItems: "center"
  },
  placeImage: {
      marginRight: 8,
      height: 90,
      width: 90
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  }
});

export default listItem;
