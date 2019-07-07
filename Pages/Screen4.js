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


// Edit Book
export default class Screen4 extends Component<Props> {



  componentDidMount() {
    this.props.navigation.setParams({ SaveButton: this.uploadDetails });



  }

  constructor(props){

        super(props);
        this.state = {

            title: this.props.navigation.state.params.title,
            author: this.props.navigation.state.params.author,
            creatData: this.props.navigation.state.params.publicationDate,
            content: this.props.navigation.state.params.description,
            ID: this.props.navigation.state.params.id,




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



  uploadDetails = () =>{


    var title = this.state.title;
    var author = this.state.author;
    // var publicationDate = this.state.creatData;
    var description = this.state.content;
    var ID = this.state.ID;

    console.log("ID. "+ID);

    

    var date = moment().format(); 



    fetch('https://demo.api-platform.com'+ID, {
              method: 'PUT',
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
                this._toast('UPDATE DONE!');
              }else{
                this._toast('UPDATE ERROR');
              }



          })
          .catch((error) => {
              // console.error(error);
              // this.reset();
              console.warn("ERROR. "+error);
              // console.warn(error);
          });













  }




  deleteBooks = () =>{

    // var title = this.state.title;
    // var author = this.state.author;
    // // var publicationDate = this.state.creatData;
    // var description = this.state.content;
    var ID = this.state.ID;

    console.log("ID. "+ID);

    

    // var date = moment().format(); 



    fetch('https://demo.api-platform.com'+ID, {
              method: 'DELETE',
              headers: {
                  // 'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },

          })
          .then((response) => response.json())
          .then((jsonData) => {
            
              console.log(jsonData);
              
              var value = jsonData['@context'];
              value = value.slice(10);

              if (value == 'Book') {
                this._toast('DELETE DONE!');
              }else{
                this._toast('DELETE ERROR!');
              }



          })
          .catch((error) => {
              // console.error(error);
              // this.reset();
              console.warn("ERROR. "+error);
              // console.warn(error);
          });




  }





  static navigationOptions = ({ navigation }) => {
    // console.warn(navigation.state.params.author);


    var author = navigation.state.params.author;
    var publicationDate = navigation.state.params.publicationDate;
    var description = navigation.state.params.description;
    var title = navigation.state.params.title;


    const { params ={} } = navigation.state;

    

    

    return{

      title: title,

      headerBackTitle:null,
      headerStyle: {
        backgroundColor: 'rgba(254,183,78,0.5)',
        // panddingRight: 100,
      },
      headerTintColor:'white',
      headerTintStyle: {
        fontSize: 20,
      },
      showIcon:true,
      swipeEnabled:false,
      animationEnabled:false,
      headerRight: (
        <View>
          <TouchableOpacity onPress={() => params.SaveButton()}>
      
                  <Text style={styles.New}>Save</Text>

          </TouchableOpacity>
        </View>
      ),
      headerLeft: <BackButton {...navigation} />,


    }





    
  };








  render() {
    
    // const author = this.props.navigation.state.params.author;
    // const publicationDate = this.props.navigation.state.params.publicationDate;
    // const description = this.props.navigation.state.params.description;
    // const title = navigation.state.params.title;






    // console.log(author);

    


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

        <TouchableOpacity style={styles.deleteView} onPress={() => this.deleteBooks()}>
    
                <Text style={styles.delete}>Delete</Text>

        </TouchableOpacity>




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
        <TouchableOpacity onPress={() => uploadData()}>
    
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
    textAlignVertical: 'top',//重点 
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
  },


  deleteView:{
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9,
    backgroundColor: '#ff2d2d',
    marginTop: 15,
    height: 40,
  },
  delete:{

    color: 'white', 
    fontWeight: 'bold',
    fontSize: 17,
  },



});
