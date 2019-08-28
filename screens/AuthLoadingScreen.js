import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    View,
} from 'react-native';
import firebase from 'firebase';

import User from '../User';

export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    componentWillMount() {
        // Your web app's Firebase configuration
        var firebaseConfig = {
            apiKey: "AIzaSyAQ9H7pXS_V1XFrZMCKyGWFBxLiEiYAZew",
            authDomain: "project-line-51d62.firebaseapp.com",
            databaseURL: "https://project-line-51d62.firebaseio.com",
            projectId: "project-line-51d62",
            storageBucket: "",
            messagingSenderId: "267973187652",
            appId: "1:267973187652:web:b23368871495a536"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        User.phone = await AsyncStorage.getItem('userPhone');
        this.props.navigation.navigate(User.phone ? 'App' : 'Auth');
    };

    // Render any loading content that you like here
    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}