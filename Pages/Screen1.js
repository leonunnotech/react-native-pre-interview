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
  Image,
  TouchableOpacity,
  ScrollView,



} from 'react-native';

import moment from 'moment';
import Dimensions from 'Dimensions';
import Toast from 'react-native-root-toast';


var {width} = Dimensions.get('window');
var {height} = Dimensions.get('window');


 
var hMargin = 15;

var cols = 2;
var boxW = 170;
 
var wMargin = (width - cols * boxW) / (cols + 1);



export default class Screen1 extends Component<Props> {

  componentDidMount(){

    this.getData();
  }

  constructor(props){

        super(props);
        this.state = {
            allBooks: [],
            currentItem: 8,
            end: false,





        };
    }



  getData = () => {


      fetch('https://demo.api-platform.com/books', {
              method: 'get',
              headers: {
                  // 'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
          })
          .then((response) => response.json())
          .then((jsonData) => {
            
              console.log(jsonData['hydra:member']);
              this.setState({
                allBooks: jsonData['hydra:member'],
              })
              



          })
          .catch((error) => {
              // console.error(error);
              // this.reset();
              console.warn(error);
              // console.warn(error);
          });




// NO Headers

      // fetch('https://demo.api-platform.com/books', {})
      //     .then((response) => response.json())
      //     .then((jsonData) => {
            
      //         console.log(jsonData);
      //         console.log(jsonData['hydra:member'][0]);
      //         this.setState({
      //           allBooks: jsonData['hydra:member'],
      //         })

              



      //     })
      //     .catch((error) => {
      //         // console.error(error);
      //         // this.reset();
      //         console.warn(error);
      //         // console.warn(error);
      //     });




      

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



    //所有按鈕
    renderAllBooks() {
        // 放所有程式碼的陣列
        var allBadge = [];
        // JSON
        var BageDate = this.state.allBooks;
        var length = BageDate.length;
        var currentItem = this.state.currentItem;
        // console.log('test. '+currentItem);
        // console.log('end. '+this.state.end);


        if (this.state.end) { 
          // console.log('沒資料了！！');
          this._toast('資料顯示完畢!');
          currentItem = BageDate.length;
        }else if(BageDate.length<currentItem){
          

          currentItem = BageDate.length;
          this._toast('加載中..');
          setTimeout(() => {this._toast('加載完畢..')}, 800);
          
        }else{
          this._toast('加載中..');
          setTimeout(() => {this._toast('加載完畢..')}, 800);
        }
        
        if (BageDate.length != 0 && !currentItem<BageDate.length) {
          
          // console.log('length.'+length+" current. "+currentItem);
          //JSON數據
          for (let i=0;i<currentItem;i++){
              //取出單獨的數據對象
              var badge = BageDate[i];


              let id = badge['@id'];
              let author = badge.author;
              let title = badge.title;
              let description = badge.description;
              let isbn = badge.isbn;
              let publicationDate = badge.publicationDate;
              publicationDate = moment(publicationDate).format('YYYY-MM-DD');

              // console.log(id);

              


              // console.log(author+"\t"+description+"\t"+isbn+"\t"+publicationDate+"\t"+title);
              
              // 定義一個nativeImageSource需要個參數
              // let ades = {
              //   android: ,
              //   ios: ,
              //   width: 75,
              //   height: 75
              // };<Image style={styles.textImageStyle} source={nativeImageSource(ades)}/>

              // 開始放入資料與格式
              allBadge.push(

                <TouchableOpacity key = {i} onPress={() => this.props.navigation.navigate('Screen2',
                                                      {
                                                        id: id,
                                                        author: author, 
                                                        publicationDate: publicationDate, 
                                                        title: title, 
                                                        description: description,

                                                        
                                                      }



                                                    )}>
                  <View key={i} style={styles.outViewStyle}>



                      <Image style={styles.textImageStyle} source={require('../book2.jpg')}/>
                      
                      <View style={styles.test}>
                        <Text style={styles.textTitleStyle}>
                            {title}
                        </Text>



                        <View style={styles.bottomStyle}>

                          <Text style={[styles.textBottomStyle, styles.fontItalic]}>
                              by {author}
                          </Text>

                          <Text style={styles.textBottomStyle}>
                              {publicationDate}
                          </Text>




                        </View>
                      </View>
                    
                  </View>
                </TouchableOpacity>
              );
          }


          //返回陣列
          return allBadge;

        }



        

    }




    _contentViewScroll = (e) => {
        var offsetY = e.nativeEvent.contentOffset.y; // 已经滚动的距离
        var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; // 可滚动的可见区域高度
        var contentSizeHeight = Math.round(e.nativeEvent.contentSize.height); // 可滚动的总高度
        if (Math.round(offsetY + oriageScrollHeight) >= contentSizeHeight){
            

            if (this.state.allBooks.length>this.state.currentItem) {
                this.setState({
                  currentItem: this.state.currentItem+8,
                });
            }else{
                this.setState({
                  end:true,
                })
            }
            this.renderAllBooks();

        }
    }













  render() {
    return (
      <View>
          

           <ScrollView

              onScroll = {this._contentViewScroll}
              scrollEventThrottle={0}

          >

          <View style={styles.container}>
            {this.renderAllBooks()}
          </View>

          
          </ScrollView>



          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
        flex: 1, //要換行就要去掉
        backgroundColor: '#f0f0f0',
        flexDirection:'row',
        flexWrap:'wrap',
        // height:Dimensions.get('window').height,
        

    },
    outViewStyle: {
        backgroundColor:'white',
        alignItems:'center',
        width:boxW,
        height:boxW,
        marginLeft:wMargin,
        marginTop:hMargin,
        paddingTop:10,

    },

    bottomStyle: {
      width:boxW,
      marginTop:5,
      flexDirection:'row',
      flexWrap:'wrap',

    },



    textImageStyle: {
        width:75,
        height:65,
    },

    textTitleStyle: {
      color: '#6c6c6c',
      fontSize: 12,

    },
    textBottomStyle: {
      color: '#6c6c6c',
      fontSize: 7,
      paddingLeft: 4,

    },

    
    fontItalic:{
      fontStyle: 'italic',

    },


    test: {
      alignContent: 'space-around',
    }
});
