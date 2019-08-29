import React from 'react';
import {View, Text, FlatList, AsyncStorage, TouchableOpacity} from 'react-native';
import User from '../User';
import styles from '../constants/styles';
import firebase from 'firebase';
import {YellowBox} from 'react-native';


export default class HomeScreen extends React.Component{
    
    static navigationOptions = {

        title: 'CHATTING' 
    }
    constructor(){
        super()
        YellowBox.ignoreWarnings(['Warning: Async Storage has been extracted from react-native core']);
    }
    
    state = {
        users : []
    }

    componentWillMount(){
        // firebase.database().ref('users/'+User.phone).set({name:this.state.name})     
        var dbRef = firebase.database().ref('users');
        dbRef.on('child_added', (val)=>{
            var person = val.val();
            person.phone = val.key;
            if (person.phone===User.phone) {
                User.name = person.name
            }else{
                this.setState((prevState)=>{
                    return {
                        users: [...prevState.users, person]
                    }
                })
            }
        })
    }


    _logOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>{User.phone}</Text>
                <TouchableOpacity onPress={this._logOut}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }

    renderRow = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={()=> this.props.navigation.navigate('Chat', item)}
                style={{padding:10,borderBottomColor:'#ccc',borderBottomWidth:1}}>
                <Text style={{fontSize:20}}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    render(){
        return(
            <View>
            {/* <TouchableOpacity
                onPress={()=> this.props.navigation.navigate('Chat', item)}
                style={{padding:10,borderBottomColor:'#eaeaea',borderBottomWidth:1}}>
                <Text style={{fontSize:20}}>Status</Text>
            </TouchableOpacity> */}

                {/* <Text>{User.phone}</Text> */}
                <TouchableOpacity onPress={this._logOut}>
                    <Text>Logout</Text>
                </TouchableOpacity>

                <FlatList
                data={this.state.users}
                renderItem={this.renderRow}
                keyExtractor={(item)=> item.phone}
                >

                </FlatList>
            </View>
        )
    }
}