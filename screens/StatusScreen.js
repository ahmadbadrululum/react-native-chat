import React from 'react';
import { View,AsyncStorage, FlatList, Dimensions,    Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import User from '../User';
import styles from '../constants/styles';
import firebase from 'firebase';
import {YellowBox} from 'react-native';

export default class StatusScreen extends React.Component {

    static navigationOptions = {
        title: 'Status' 
    }

    constructor(props) {
        super(props);
        this.state = {
            statusMessage: '',
            statusList:[]
        }
        YellowBox.ignoreWarnings(['Warning: Async Storage has been extracted from react-native core']);
    }

    componentWillMount(){
        firebase.database().ref('status')
            .on('child_added', (value) => {
                this.setState((prevState)=>{
                    return {
                        statusList: [...prevState.statusList, value.val()]
                    }
                })
            })
    }

    handleChange = key => val => {
        this.setState({ [key]: val })
    }

    convertTime = (time) => {
        let d = new Date(time);
        let c = new Date();
        let result = (d.getHours() < 10 ? '0' :'') + d.getHours() + ':';
        result += (d.getMinutes() < 10 ? '0' : '') +d.getMinutes();
        if (c.getDay() !== d.getDay()) {
            result = d.getDay() + ' ' + d.getMonth() + ' ' + result;
        }
        return result;
    }

    sendMessage = async () => {
        if (this.state.statusMessage.length > 0) {
            let msgId = firebase.database().ref('status').push().key;
            let updates = {}
            let message = {
                message: this.state.statusMessage,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: User.phone,
                name: User.name,
            }
            updates['status/'+msgId] = message;
            firebase.database().ref().update(updates);
            this.setState({statusMessage: ''})
        }
    }
    

    renderRow = ({item}) => {
        return(
            <View style={{
                flexDirection:'row',
                width:'100%',
                alignSelf: 'flex-start',
                backgroundColor:'#7cb342',
                borderRadius:5,
                marginBottom:1,
            }}>
                <Text style={{color:'#fff', padding:7, fontSize:16}}>{item.name+' - '+item.message} <Text style={{color:'#eee', padding:3, fontSize:10}}>{this.convertTime(item.time)}</Text></Text>
                
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView>

                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <TextInput
                        placeholder="type message"
                        style={styles.input}
                        value={this.state.statusMessage}
                        onChangeText={this.handleChange('statusMessage')}
                    />
                    <TouchableOpacity
                        onPress={this.sendMessage}>
                        <Text>Send</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                style={ {padding:10}}
                data={this.state.statusList}
                renderItem={this.renderRow}
                keyExtractor={(item, index)=> index.toString()}
                >
                </FlatList>
            </SafeAreaView>
        )
    }
}