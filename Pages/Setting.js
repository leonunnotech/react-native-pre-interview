/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  Text, 
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,



} from 'react-native';



import { navigationOptions } from 'react-navigation';
// import DrawerContent from './Pages/DrawerContent';
// import Orientation from 'react-native-orientation';



// import Setting from './Pages/Setting';


//導入螢幕分辨率的框架
import Dimensions from 'Dimensions';


export default class Setting extends Component<Props> {




  constructor(props){

        super(props);
        this.state = {
            userName:'',
            userPass:'',


        };
    }


    userLogin = () => {


      const userName = this.state.userName;
      const userPass = this.state.userPass;



      // alert(userName+",  "+userPass);

    }





  render() {
    return (

      <ScrollView>
        <TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            

            <View style={styles.flexRow}>


              <View style={styles.flexColumn}>
                <Text style={styles.text}>{'Name :'}</Text>
                <Text style={styles.text}>{'PassWord :'}</Text>
              </View>


              <View style={styles.flexColumn}>
                  
                <TextInput
                  placeholder="Enter Name"
                  style={styles.textInput}
                  onChangeText = {userName => this.setState({userName})}
                />


                <TextInput
                  secureTextEntry={true}
                  clearTextOnFocus={true}
                  placeholder="Enter PassWord"
                  style={styles.textInput}
                  onChangeText = {userPass => this.setState({userPass})}
                />
              </View>


            </View>

            
            <View style={{marginTop:20}}>
              <TouchableOpacity style={styles.login_button} onPress={this.userLogin}>
                <Text style={styles.ButtonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.register_button} onPress={() => this.props.navigation.navigate("Register")}>
                <Text style={styles.ButtonText}>Registration</Text>
              </TouchableOpacity>
            </View>


          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    height: Dimensions.get('window').height-80,
    // justifyContent: 'center',
    paddingTop:130,
    alignItems: 'center',
    backgroundColor: '#5b5b5b',

  },
  text: {
    fontWeight: 'bold',
    margin: 20,
  },
  flexRow: {
    flexDirection:'row',
  },
  flexColumn: {
    flexDirection:'column',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textInput: {
    width:200,
    margin: 10,
    fontWeight: 'bold',
    fontSize: 12,
    height: 40,
    width: 160,
    color: '#000',
    borderColor: '#5b5b5b',
    backgroundColor: '#8e8e8e',
    borderWidth: 1,
    padding: 10,
    textAlign: 'center',
    borderRadius: 9,
  },

  ButtonText: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  login_button: {
    margin: 5,
    paddingTop: 8,

    height: 40,
    width: 250,
    backgroundColor: '#97cbff',
    borderRadius: 9,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  register_button: {
    margin: 5,
    paddingTop: 8,

    height: 40,
    width: 250,
    backgroundColor: '#ff7575',
    borderRadius: 9,
    // alignItems: 'center',
    // justifyContent: 'center',
  },



});
