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
  TouchableOpacity,




} from 'react-native';
import { navigationOptions, StackNavigator } from 'react-navigation';




const title='';
export default class Screen2 extends Component<Props> {


  componentDidMount() {



  }


   static navigationOptions = ({ navigation }) => {
    // console.warn(navigation.state.params.title);



    return {
      title: navigation.state.params.title,
      headerBackTitle:null,
      headerStyle: {
        backgroundColor: 'rgba(254,183,78,0.5)',
        // panddingRight: 100,
      },
      headerTintColor:'#fff',
      showIcon:true,
      swipeEnabled:false,
      animationEnabled:false,
      headerRight: <EditButton {...navigation} />,
      headerLeft: <BackButton {...navigation} />,
    };
  };


  




  render() {

    var author = this.props.navigation.state.params.author;
    var publicationDate = this.props.navigation.state.params.publicationDate;
    
    var description = this.props.navigation.state.params.description;
    var id = this.props.navigation.state.params.id;

    console.log(id);


    




    return (
      <View style={styles.container}>
        <View style={styles.row}>

            <Text style={styles.titleText}>

              {author}

            </Text>


            <Text style={styles.titleText}>
            
              {publicationDate}

            </Text>



        </View>
        <View>

          <Text style={styles.contentText}>

            {description}

          </Text>


        </View>
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



const EditButton = (props) =>{



  return (
      <View>
        <TouchableOpacity onPress={() => props.navigate('Screen4',
                                    {
                                      id: props.state.params.id,
                                      author: props.state.params.author,
                                      publicationDate: props.state.params.publicationDate,
                                      description: props.state.params.description,
                                      title: props.state.params.title,

                                    }

                                  )}>
    
                <Text style={styles.New}>Edit</Text>

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
  },

  row: {

    flexDirection:'row',
    justifyContent: 'space-between',
    margin: 18,

  },

  titleText: {
    fontSize: 11,
    color: '#9d9d9d',
    fontFamily: 'Arial',

  },


  contentText: {

    fontSize: 14,
    margin: 18,
    fontFamily: 'Arial',



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
