import * as React from 'react';
import { Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { create, reset } from '../../actions/book/create';
import { Actions } from 'react-native-router-flux';
import { delayRefresh } from '../../utils/helpers';

const tabBarIcon = name => ({ tintColor, horizontal }) => (
    <MaterialIcons name={name} color={tintColor} size={horizontal ? 17 : 24} />
  );
  
class CreateScreen extends React.Component {

    componentWillUnmount() {
        this.props.reset();
      }
      
      static navigationOptions = {
          tabBarOptions: {
          style: {
              backgroundColor: '#1e3e53',
          },
          activeTintColor: 'white',
          },
          tabBarLabel: 'Create',
          tabBarIcon: tabBarIcon('add-circle-outline'),
          // tabBarButtonComponent: TouchableBounce,
      };
      
      onSubmit = values => {
        this.props.create(values);
        Actions.bookList();
        delayRefresh();
      };


    render() {

        if (this.props.created) return Actions.pop();

        const {viewStyle, textStyle} = styles;

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#c9ad89' }}>
                <Text>Create book!</Text>
            </View>
    );
    }
}

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
  textStyle: {
    color: 'red',
    textAlign: 'center',
  },
};

const mapStateToProps = state => {
  const {created, error, loading} = state.book.create;
  return {created, error, loading};
};

const mapDispatchToProps = dispatch => ({
  create: values => dispatch(create(values)),
  reset: () => dispatch(reset()),
});


export default connect(mapStateToProps, mapDispatchToProps)(CreateScreen);