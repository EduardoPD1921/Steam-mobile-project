import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import CheckBox from '@react-native-community/checkbox'

import firebase from 'firebase'
import { StatusBar } from 'expo-status-bar'

import SignupInput from '../components/SignupInput'
import SignupButton from '../components/SignupButton'

import onChangeTextHandler from '../Functions/onChangeTextHandler'
import getMessageByErrorCode from '../Functions/getMessageByErrorCodeSignup'

export default class SignupPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            email: '',
            password: '',
            isLoading: false,
            emailError: false,
            passwordError: false,
            usernameError: false
        }
    }

    componentDidMount() {
        const firebaseConfig = {
            apiKey: "AIzaSyBk3BO2aRLKWei6DLMRajGyyhwdwF5-S5A",
            authDomain: "steam-mobile-project.firebaseapp.com",
            databaseURL: "https://steam-mobile-project.firebaseio.com",
            projectId: "steam-mobile-project",
            storageBucket: "steam-mobile-project.appspot.com",
            messagingSenderId: "329367772364",
            appId: "1:329367772364:web:44590cf7e0e0495ae93669",
            measurementId: "G-F0F5Z49DVL"
          }

          if (!firebase.apps.length) {
              firebase.initializeApp(firebaseConfig)
          }
    }

    trySignup() {
        const { email, password, username } = this.state

        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                let user = firebase.auth().currentUser

                user.updateProfile({
                    displayName: username
                })
            })
            .catch(error => {
                let test = getMessageByErrorCode.bind(this)
                test(error.code)
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.arrowContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Image style={styles.arrowIcon} source={require('../../images/arrowIcon.png')} />
                    </TouchableOpacity>
                </View>

                <Image style={styles.steamLogo} source={require('../../images/steamLogoLight.png')}></Image>
                <Text style={styles.signUpText}>Sign up</Text>
                
                <View style={styles.textInputContainer}>
                    <SignupInput error={this.state.emailError} onChangeTextHandler={onChangeTextHandler.bind(this)} text={'Email'} />
                    <SignupInput error={this.state.passwordError} onChangeTextHandler={onChangeTextHandler.bind(this)} text={'Password'} />
                    <SignupInput onChangeTextHandler={onChangeTextHandler.bind(this)} text={'Username'} />
                </View>

                <View style={styles.checkBoxContainer}>
                    <CheckBox tintColors={{ false: 'white' }} />
                    <Text style={styles.propagandaText}>You want to receive emails with our sales and informations?</Text>
                </View>

                <TouchableOpacity onPress={() => this.trySignup()}>
                    <SignupButton />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#152e59'
    },
    steamLogo: {
        marginTop: 50,
        width: 75,
        height: 75
    },
    signUpText: {
        fontSize: 18,
        color: 'white',
        marginTop: 25,
    },
    textInputContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 250
    },
    checkBoxContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 25
    },
    propagandaText: {
        width: 158,
        height: 29,
        fontSize: 10,
        color: 'white'
    },
    arrowIcon: {
        width: 30,
        height: 30,
        marginTop: 20,
        marginLeft: 15
    },
    arrowContainer: {
        justifyContent: 'flex-start',
        alignSelf: 'stretch'
    }
})