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
  TextInput,
  TouchableOpacity,



} from 'react-native';


import moment from 'moment';
import { navigationOptions, StackNavigator } from 'react-navigation';
import Toast from 'react-native-root-toast';



// ADD NEW BOOK
export default class Screen3 extends Component<Props> {


  componentDidMount() {
    this.props.navigation.setParams({ CreateButton: this.createBooks });



  }



  constructor(props){

        super(props);
        this.state = {
            author: '',
            title: '',
            content: '',




        };
    }


    _toast(text) {
        Toast.show(text,{
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
            // shadow: true,
            // animation: true,
            // hideOnPress: true,
            // delay: 0,
            // onShow: () => {
            //     // calls on toast\`s appear animation start
            // },
            // onShown: () => {
            //     // calls on toast\`s appear animation end.
            // },
            // onHide: () => {
            //     // calls on toast\`s hide animation start.
            // },
            // onHidden: () => {
            //     // calls on toast\`s hide animation end.
            // }
        });
    }


    createBooks = () =>{



    var author = this.state.author;
    var title = this.state.title;
    var description = this.state.content;
    // var ID = this.state.ID;

    

    var date = moment().format(); 

    // console.warn(date);


    fetch('https://demo.api-platform.com/books', {
              method: 'POST',
              headers: {
                  // 'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({

                "title": title,
                "description": description,
                "author": author,
                "publicationDate": date,
                
              })

          })
          .then((response) => response.json())
          .then((jsonData) => {
            
              console.log(jsonData);

              var value = jsonData['@context'];
              value = value.slice(10);

              if (value == 'Book') {
                this._toast('CREATE DONE!');
              }else{
                this._toast('CREATE ERROR!');
              }



          })
          .catch((error) => {
              // console.error(error);
              // this.reset();
              console.warn('ERROR. '+error);
              // console.warn(error);
          });






    






  }





    static navigationOptions = ({ navigation }) => {
    // console.warn(navigation.state.params.title);


    const { params ={} } = navigation.state;

      return {
        title: 'add New book',
        headerBackTitle:null,
        headerStyle: {
          backgroundColor: 'rgba(254,183,78,0.5)',
          // panddingRight: 100,
        },
        headerTintColor:'#fff',
        showIcon:true,
        swipeEnabled:false,
        animationEnabled:false,
        headerRight: (
          <View>
            <TouchableOpacity onPress={() => params.CreateButton()}>
        
                    <Text style={styles.New}>Save</Text>

            </TouchableOpacity>
          </View>
        ),
        headerLeft: <BackButton {...navigation} />,
      };
  };





  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.authorButton}
          onChangeText={(author) => this.setState({author})}
          value={this.state.author}
          placeholder={'Author'}
        />



        <TextInput
          style={styles.dataButton}
          onChangeText={(title) => this.setState({title})}
          value={this.state.title}
          placeholder={'Created at'}
        />


        <TextInput
          style={styles.contentButton}
          onChangeText={(content) => this.setState({content})}
          value={this.state.content}
          placeholder={''}
        />



      </View>
    );
  }
}





const BackButton = (props) =>{



  return (
      <View>
        <TouchableOpacity onPress={() => props.goBack()}>
    
                <Text style={styles.Back}>Back</Text>

        </TouchableOpacity>
      </View>
  );
            
}
const SaveButton = (props) =>{



  return (
      <View>
        <TouchableOpacity onPress={() => props.navigate('Screen3')}>
    
                <Text style={styles.New}>Save</Text>

        </TouchableOpacity>
      </View>
  );
            
}














const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  
  authorButton: {
    borderRadius: 4,
    // borderWidth: 1,
    height: 40,
    padding: 8,
    backgroundColor: '#ffff',
  },

  dataButton: {
    borderRadius: 4,
    // borderWidth: 1,
    height: 40,
    padding: 8,
    backgroundColor: '#ffff',
    marginTop: 15,
  },

  contentButton: {
    borderRadius: 4,
    // borderWidth: 1,
    height: 200,
    padding: 8,
    backgroundColor: '#ffff',
    marginTop: 15,
  },

  New: {
    marginRight: 25, 
    color: 'white', 
    fontWeight: 'bold',
    fontSize: 17,
  },
  Back:{
    marginLeft: 25, 
    color: 'white', 
    fontWeight: 'bold',
    fontSize: 17,
  }

});
