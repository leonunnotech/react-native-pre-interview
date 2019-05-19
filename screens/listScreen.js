import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
// import data from '../data.json';
import { ScrollView } from 'react-native-gesture-handler';
class ListScreen extends React.Component {
    constructor(props) {
        super(props);
        const card = {
            content: 'A long but very interesting story about REST and asyncio',
            author: 'The life!',
            time: '2002-01-29'
        }
        this.state = {
            data: {
                list0: [card, card],
                list1: [card, card],
                list2: [card, card]
            },
            listI: 2,
            card: card
        }
        this.handleMore = this.handleMore.bind(this);
        this.handleDel = this.handleDel.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleNewCard = this.handleNewCard.bind(this);
    }
    handleMore(amount) {
        // fetch('https://demo.api-platform.com/books', {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }).then((res) => {
        //     this.setState({ data: res.toString() })
        // });
        let listI = parseInt(this.state.listI),
            card = this.state.card,
            newList = {};
        for (let i = 1; i <= amount; i++) {
            const place = 'list' + parseInt(listI + i);
            newList[place] = [card, card];
        }
        this.setState({ listI: this.state.listI + amount, data: { ...this.state.data, ...newList } })
    }
    handleDel(place) {
        let listPlace = place.split('-')[0];
        let cardPlace = place.split('-')[1];
        let newData = Object.assign(this.state.data);
        newData[`list${listPlace}`][cardPlace] = null;
        this.setState({ data: newData })
    }
    handleEdit(place, author, time, content) {
        let listPlace = place.split('-')[0];
        let cardPlace = place.split('-')[1];
        let newData = Object.assign(this.state.data);
        newData[`list${listPlace}`][cardPlace] = {
            content: content,
            author: author,
            time: time
        };
        this.setState({ data: newData })
    }
    handleNewCard(author, time, content) {
        alert('新增完成');
        // //一整列是空的話就增加左邊那張卡
        // //一整列有一張卡的話就增加右邊那張卡
        // //一整列有兩張卡的話就增加新的列
        let newData = Object.assign(this.state.data);
        let listPlace = this.state.listI;
        let nowListArr = newData[`list${listPlace}`];
        let needNewList = true;
        if (nowListArr) {
            for (let i = 0; i < 2; i++) {
                if (nowListArr[i] === null) {
                    newData[`list${listPlace}`][i] = {
                        content: content,
                        author: author,
                        time: time
                    }
                    this.setState({ data: newData });
                    needNewList = false;
                    return;
                }
                if (nowListArr.length < 2) {
                    nowListArr.push({
                        content: content,
                        author: author,
                        time: time
                    })
                    this.setState({ data: newData });
                    needNewList = false;
                    return;
                }
            }
        }
        if (needNewList === true) {
            newData[`list${listPlace + 1}`] = [{
                content: content,
                author: author,
                time: time
            }];
            this.setState({ data: newData, listI: this.state.listI + 1 })
        }
    }
    render() {
        const data = this.state.data;
        return (
            <ScrollView
                onScroll={e => {
                    // const allY=e.nativeEvent.contentSize.height;
                    // const nowY=e.nativeEvent.contentOffset.y;
                    // if(Math.abs(allY-nowY)<50){
                    //     this.handleMore(4)
                    // }
                    let offsetY = e.nativeEvent.contentOffset.y; //滑动距离
                    let contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
                    let oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
                    if (offsetY + oriageScrollHeight >= contentSizeHeight) {
                        this.handleMore(4)
                    }

                }}
            >
                <View style={styles.nav}>
                    <TouchableOpacity
                    ><Text style={styles.newText}
                        onPress={() => this.props.navigation.navigate('newBookScreen', { handleNewCard: this.handleNewCard })}>
                            New
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={styles.container}>
                        {Object.keys(data).map((list, listi) => {
                            return (
                                <View style={styles.list} key={listi}>{
                                    data[list].map((card, cardi) => {
                                        return card == null ? null : (
                                            <TouchableOpacity style={styles.card} key={listi + '-' + cardi} onPress={() => this.props.navigation.navigate('EditScreen', { author: card.author, time: card.time, content: card.content, handleEdit: this.handleEdit, place: listi + '-' + cardi })}>
                                                <Text style={styles.del} onPress={() => this.handleDel(listi + '-' + cardi)}>X</Text>
                                                <Text style={styles.cardcontent}>{card.content}</Text>
                                                <Text style={{ color: '#ccc', textAlign: 'right' }}>by {card.author}</Text>
                                                <Text style={{ color: '#ccc', textAlign: 'right' }}>{card.time}</Text>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            )
                        })}
                    </View>
                    <TouchableOpacity
                        style={styles.moreBtn}
                        onPress={() => this.handleMore(4)}
                    >
                        <Text style={{ color: '#fff' }}>Load More</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    del: {
        textAlign: 'center',
        fontSize: 26,
        fontWeight: 'bold',
    },
    list: {
        width: '100%',
        flexDirection: 'row',
        margin: 10,
    },
    card: {
        backgroundColor: '#fff',
        maxWidth: '45%',
        width: '45%',
        padding: 10,
        margin: 10,
        marginBottom: 0
    },
    cardcontent: {
        marginTop: 10,
        marginBottom: 10,
        color: '#ccc',
    },
    container: {
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    nav: {
        height: 60,
        backgroundColor: '#ffc35f',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: 15,

    },
    newText: {
        fontSize: 26,
        color: 'white',
    },
    moreBtn: {
        fontSize: 26,
        color: 'white',
        backgroundColor: '#ffc35f',
        height: 55,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginStart: 20,
        marginEnd: 20,
        marginBottom: 120,
    }
});
export default ListScreen;