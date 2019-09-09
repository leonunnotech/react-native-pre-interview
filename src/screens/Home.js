import * as React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import BookList from "../components/BookList/BookList";
import { list, reset } from '../../actions/book/list';

const tabBarIcon = name => ({ tintColor, horizontal }) => (
    <MaterialIcons name={name} color={tintColor} size={horizontal ? 17 : 24} />
  );  

class Home extends React.Component {
  
  componentDidMount() {
    this.props.reset();
    this.props.list();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.refresh !== this.props.refresh) {
      this.props.list();
    }
  }

  componentWillUnmount() {
    this.props.reset(this.props.eventSource);
  }

  state = {
      book: '1',
      refreshing: false,
      memberItem: 'null'
    };

  static navigationOptions = {
    tabBarOptions: {
      style: {
        backgroundColor: '#1e3e53',
      },
      activeTintColor: 'white',
    },
    tabBarLabel: 'Home',
    tabBarIcon: tabBarIcon('import-contacts'),
    //tabBarButtonComponent: TouchableBounce,
  };

  onRefresh= () => {
    this.setState({refreshing: true});
    this.props.reset();
    this.props.list();
    this.setState({refreshing: false});
  }

  itemSelectedHandler = key => {
    console.log('keykey',key);
    
    this.props.navigation.navigate('DetailScreen', {
      key
    });
  };
  
  render() {
    console.log('this.props.retrieved',this.props.retrieved);
    
    let hydraMember = []
    if  (this.props.retrieved){
      this.props.retrieved['hydra:member'].map((item) => {
        hydraMember.push({
          key:item['@id'],
          item
        })
      })
    }
    return (

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#c9ad89' }}>
          <BookList
            onRefresh={this.onRefresh}
            refreshing={this.state.refreshing}
            books={hydraMember}
            key={hydraMember['@id']}
            onItemSelected={this.itemSelectedHandler}
          />
      </View>

    );
  }
}

  const mapStateToProps = state => {
    const {retrieved, error, loading, eventSource} = state.book.list;
    return {retrieved, error, loading, eventSource};
  };
  
  const mapDispatchToProps = dispatch => ({
    list: page => dispatch(list(page)),
    reset: eventSource => dispatch(reset(eventSource)),
  });

export default connect(mapStateToProps, mapDispatchToProps)(Home);