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
  Alert,
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


export default class Register extends Component<Props> {




  constructor(props){

        super(props);
        this.state = {
            userName:'',
            userPass:'',
            userPass2:'',
            userEmail:'',



        };
    }




    checkValue = () => {

      const userName = this.state.userName;
      const userPass = this.state.userPass;
      const userPass2 = this.state.userPass2;
      const userEmail = this.state.userEmail;


      if (userPass2 != userPass) {
        alert('Check PassWord Error!!');
      }else{
        if (userPass=='' || userPass2 =='' || userEmail=='' || userName=='') {
          alert('Enter Value Can\'t null!!');
        }else{
          this.Registration();
          // alert('OK');
        }
      }







    }









    Registration = () => {


      const userName = this.state.userName;
      const userPass = this.state.userPass;
      const userPass2 = this.state.userPass2;
      const userEmail = this.state.userEmail;


      // alert(userName+",  "+userPass+",  "+userPass2+",  "+userEmail);

      if (userPass2 != userPass) {

        alert('Check PassWord Error!!');


      }else{
        fetch('http://127.0.0.1/MassageShopAPI/Register_Check.php', {
              method: 'post',
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: "account="+userName+"&password="+userPass+"&email="+userEmail
          })
          .then((response) => response.json())
          .then((jsonData) => {
            
              // console.warn(jsonData);

              if (jsonData == 'Register Success') {
                Alert.alert("註冊成功","歡迎你的加入！");
              }else if(jsonData == 'Already have this account'){
                Alert.alert("註冊失敗","已有此帳號！");
              }else if(jsonData == 'Register Fail'){
                Alert.alert("註冊失敗","請重新註冊一次！");
              }
              



          })
          .catch((error) => {
              // console.error(error);
              // this.reset();
              Alert.alert("註冊失敗","IP or Port Error");
              // console.warn(error);
          });
      }




      

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
                <Text style={styles.text}>{'Check PassWord :'}</Text>
                <Text style={styles.text}>{'Email :'}</Text>
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
                <TextInput
                  secureTextEntry={true}
                  clearTextOnFocus={true}
                  placeholder="Enter PassWord Again"
                  style={styles.textInput}
                  onChangeText = {userPass2 => this.setState({userPass2})}
                />
                <TextInput
                  placeholder="Enter Email"
                  style={styles.textInput}
                  onChangeText = {userEmail => this.setState({userEmail})}
                />
              </View>


            </View>

            
            <View style={{marginTop:20}}>
              
              <TouchableOpacity style={styles.register_button} onPress={this.checkValue}>
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
