import React from 'react';
import { 
  Text, 
  View, 
  TouchableOpacity,
  StyleSheet,



} from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';

import Screen1 from '../Pages/Screen1';
import Screen2 from '../Pages/Screen2';
import Screen3 from '../Pages/Screen3';
import Screen4 from '../Pages/Screen4';





// const TabNavigator = createBottomTabNavigator({
//   Home: HomeScreen,
//   Settings: SettingsScreen,
// });








const MainNavigator = createStackNavigator({




  Screen1:{ 
    screen: Screen1,

    navigationOptions: ({ navigation }) => {

      // console.warn(navigation.state.isDrawerOpen);


          return {
            title:'',
            headerBackTitle:null,
            headerStyle: {
              backgroundColor: 'rgba(254,183,78,0.5)',
              // panddingRight: 100,
            },
            // headerTintColor:'#acd6ff',
            showIcon:true,
            swipeEnabled:false,
            animationEnabled:false,
            headerRight: <NewButton {...navigation} />,
          };

              
    }, 
  },
  Screen2:{ 
    screen: Screen2, 

  },







  Screen3:{ 
    screen: Screen3, 




  },

  Screen4:{

    screen: Screen4,


  },






});




const NewButton = (props) =>{



  return (
      <View>
        <TouchableOpacity onPress={() => props.navigate('Screen3')}>
    
                <Text style={styles.New}>NEW</Text>

        </TouchableOpacity>
      </View>
  );
            
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
        <TouchableOpacity onPress={() => props.navigate('Screen3')}>
    
                <Text style={styles.New}>Edit</Text>

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










export default createAppContainer(MainNavigator);