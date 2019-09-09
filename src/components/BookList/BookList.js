import React from "react";
import { StyleSheet, FlatList } from "react-native";

import ListItem from "../ListItem/ListItem";

const bookList = props => {
  
  return (
    <FlatList
        style={styles.listContainer}
        data={props.books}
        onRefresh={props.onRefresh}
        refreshing={props.refreshing}
        extraData={props}
        renderItem={(info) => ( 
        <ListItem
          bookKey={info.item.item['@id']}
          bookTitle={info.item.item.title}
          bookAuthor={info.item.item.author}
          bookDescription={info.item.item.description}
          bookPublicationDate={info.item.item.publicationDate}
          onItemPressed={() => props.onItemSelected(info.item.key)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
});

export default bookList;
