import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, Text } from 'react-native';
import { Card, List, ListItem, SocialIcon } from 'react-native-elements';
import { retrieve, reset } from '../../../actions/book/show';
import { del } from '../../../actions/book/delete';
import { list } from '../../../actions/book/list';
import { Confirm } from '../../../src/components/Confirm/Confirm';

class DetailScreen extends React.Component {

  state = { 
    showModal: false,
   };

  componentDidMount() {
    const { navigation } = this.props;
    const key = navigation.getParam('key');
    this.props.retrieve(key);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.refresh !== this.props.refresh) {
      this.props.list();
    }
  }

  componentWillUnmount() {
    this.props.reset();
  }

  remove() {
    this.setState({showModal: !this.state.showModal});
  }

  Update(id) {
    this.props.navigation.navigate('UpdateScreen', {
      id
    });
  }

  onAccept() {
    const {del, retrieved} = this.props;
    del(retrieved);
    this.setState({showModal: false});
    this.props.navigation.navigate('Home')
  }

  onDecline() {
    this.setState({showModal: false});
  }

  static renderRow(title, value) {
    return (
        <ListItem
            subtitleStyle={ {color: 'black', fontSize: 16} }
            titleStyle={ {color: 'gray', fontSize: 16, paddingBottom: 10} }
            key={value}
            hideChevron={true}
            title={title}
            subtitle={Array.isArray(value) ? value.length.toString() : value}
            subtitleNumberOfLines={100}
        />
    );
  }

  actionButtons(id) {
    return (
        <View style={styles.actionStyle}>
          <SocialIcon
              iconSize={34}
              type='edit'
              iconColor='#1e3e53'
              onPress={() => this.Update(id)}
          />
          <SocialIcon
              iconSize={34}
              type='trash'
              iconColor='#1e3e53'
              onPress={() => this.remove()}
          />
        </View>
    );
  }


  render() {

    const item = this.props.retrieved;

    const {viewStyle, textStyleAlert } = styles;

    return (
        <View style={ {flex: 1} }>
          <ScrollView>
            {item &&
            <Card title={item['title']}>
                {DetailScreen.renderRow('id', item['@id'])}
                {DetailScreen.renderRow('isbn', item['isbn'])}
                {DetailScreen.renderRow('title', item['title'])}
                {DetailScreen.renderRow('description', item['description'])}
                {DetailScreen.renderRow('author', item['author'])}
                {DetailScreen.renderRow('publicationDate', item['publicationDate'])}  
            </Card>
            }        
            {this.props.deleteError && <View style={viewStyle}><Text style={textStyleAlert}>{this.props.deleteError}</Text></View>}
            {this.props.error && <View style={viewStyle}><Text style={textStyleAlert}>{this.props.error}</Text></View>}
          </ScrollView>
          {item && this.actionButtons(item['@id'])}
          <Confirm
              visible={this.state.showModal}
              onAccept={() => this.onAccept()}
              onDecline={() => this.onDecline()}
          >
            Are you sure you want to delete this?
          </Confirm>
        </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.book.show.error,
    loading: state.book.show.loading,
    retrieved: state.book.show.retrieved,
    deleteError: state.book.del.error,
    deleteLoading: state.book.del.loading,
    deleted: state.book.del.deleted,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    retrieve: id => dispatch(retrieve(id)),
    list: page => dispatch(list(page)),
    del: item => dispatch(del(item)),
    reset: () => dispatch(reset()),
  };
};

const styles = {
  viewStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
  },
  textStyleAlert: {
    color: 'red',
    textAlign: 'center',
  },
  actionStyle: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignContent: 'center',
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailScreen);