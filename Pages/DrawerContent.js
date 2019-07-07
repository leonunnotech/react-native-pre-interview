
import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  Text, 
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ListView,
  AsyncStorage,
  Alert,
  DeviceEventEmitter,




} from 'react-native';


import { navigationOptions, TabNavigator, NavigationAction } from 'react-navigation';
// import { Icon } from 'react-native-elements';


export default class DrawerContent extends React.Component {


  componentDidMount() {
    




  }

  constructor(props){

      super(props);
      this.state={

        userAccount: '',

      }

    }









  render() {

    return (
      <View style={styles.container}>
        <View style={styles.menuItem}>

          <ScrollView style={{paddingBottom:20}}>
            

            <TouchableOpacity onPress={() => [this.props.navigation.navigate('Screen1'), DeviceEventEmitter.emit('Title','Screen1')]}>
              <Text style={styles.text}>
                Screen1
              </Text>
            </TouchableOpacity>

            


            
            



            <TouchableOpacity onPress={() => [this.props.navigation.navigate('Setting'), DeviceEventEmitter.emit('Title','設定')]}>
              <Text style={styles.text}>
                設定
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

      </View>
    );
  }
}

//











const styles = StyleSheet.create({

  container: {
    flex: 1,

    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingTop:20,
  },

  closeButtomContainer: {
    alignItems: 'flex-end',
    marginRight:30,
  },
  menuItem:{
    alignItems: 'center',
    paddingBottom:40,
  },

  text: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 15,
    color: 'white',
  },
  

});











