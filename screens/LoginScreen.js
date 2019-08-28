import React from 'react'
import {
    TouchableOpacity,
    Text,
    TextInput,
    View,
    Alert,
    AsyncStorage,
} from 'react-native';
import User from '../User';
import styles from '../constants/styles';
import firebase from 'firebase';


export default class LoginScreen extends React.Component {

    static navigationOptions = {
        header: null
    }

    state = {
        phone: '',
        name: ''
    }

    handleChange = key => val => {
        this.setState({ [key]: val })
    }

    // proses save sestorage
    // componentDidMount(){
    constructor() {
        super()
        AsyncStorage.getItem('userPhone').then(val => {
            if (val) {
                this.setState({ phone: val })
            }
        })
    }

    //   AsyncStorage.getItem('userPhone').then(val=>{

    // AsyncStorage.getItem('userPhone', (error, result) => {


    submitForm = () => {
        if (this.state.phone.length < 10) {
            Alert.alert('Error', 'wrong phone number')
        } else if (this.state.name.length < 3) {
            Alert.alert('Error', 'wrong name')
        } else {
            // await AsyncStorage.setItem('userPhone',this.state.phone);
            AsyncStorage.setItem('userPhone', this.state.phone);
            User.phone = this.state.phone
            firebase.database().ref('users/'+User.phone).set({name:this.state.name})
            this.props.navigation.navigate('App');
        }

    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder="phone"
                    keyboardType="number-pad"
                    style={styles.input}
                    value={this.state.phone}
                    onChangeText={this.handleChange('phone')}
                />

                <TextInput
                    placeholder="name"
                    style={styles.input}
                    value={this.state.name}
                    onChangeText={this.handleChange('name')}
                />
                <TouchableOpacity
                    onPress={this.submitForm}
                >
                    <Text>enter</Text>
                </TouchableOpacity>


            </View>
        );
    }

    // }
};



// export default App;
