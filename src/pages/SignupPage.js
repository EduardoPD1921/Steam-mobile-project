import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import CheckBox from '@react-native-community/checkbox'

import firebase from 'firebase'
import { StatusBar } from 'expo-status-bar'

import SignupInput from '../components/SignupInput'
import SignupButton from '../components/SignupButton'

import onChangeTextHandler from '../Functions/onChangeTextHandler'

export default class SignupPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            email: '',
            password: '',
            isLoading: false,
            message: '',
            emailError: false,
            passwordError: false,
            usernameError: false,
            signupSuccess: false
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

    /*test() {
        setInterval(() => {
            this.props.navigation.goBack()
        }, 3000);   
    }*/

    trySignup() {
        if (this.state.username) {
            this.setState({ isLoading: true })

            const { email, password, username } = this.state

            firebase.auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    let user = firebase.auth().currentUser

                    user.updateProfile({
                        displayName: username
                    }).then(
                        this.setState({
                            isLoading: false,
                            signupSuccess: true,
                            emailError: false,
                            passwordError: false,
                            usernameError: false,
                            message: 'Sign up succesful!'
                        }),
                        setInterval(() => {
                            this.props.navigation.goBack()
                        }, 500)
                    )
                    
                })
                .catch(error => {
                    this.setState({
                        isLoading: false,
                        message: this.getMessageByErrorCode(error.code)
                    })

                })
        } else {
            this.setState({
                message: this.getMessageByErrorCode('invalid-username')
            })
        }
    }

    getMessageByErrorCode(error) {
        this.setState({
            emailError: false,
            passwordError: false,
            usernameError: false
        })
    
        switch (error) {
            case 'auth/invalid-email':
                this.setState({ emailError: true })
                return 'Invalid email'
            case 'auth/email-already-in-use':
                this.setState({ emailError: true })
                return 'Email already in use'
            case 'auth/weak-password':
                this.setState({ passwordError: true })
                return 'Password is too weak'
            case 'invalid-username':
                this.setState({ usernameError: true })
                return 'Invalid username'
            default:
                return 'Unkown error'
        }
    }

    renderButtonLoading() {
        if (this.state.isLoading === true) {
            return (
                <ActivityIndicator style={{ marginTop: 30 }} color='#076BBB' />
            )
        }

        return (
            <TouchableOpacity onPress={() => this.trySignup()}>
                <SignupButton />
            </TouchableOpacity>
        )
    }

    renderMessage() {
        if (this.state.message) {
            return (
                <Text 
                    style={this.state.signupSuccess ? styles.successMessage : styles.errorMessage
                    }>{this.state.message}
                </Text>
            )
        }
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
                    <SignupInput success={this.state.signupSuccess} error={this.state.emailError} onChangeTextHandler={onChangeTextHandler.bind(this)} text={'Email'} />
                    <SignupInput success={this.state.signupSuccess} error={this.state.passwordError} onChangeTextHandler={onChangeTextHandler.bind(this)} text={'Password'} />
                    <SignupInput success={this.state.signupSuccess} error={this.state.usernameError} onChangeTextHandler={onChangeTextHandler.bind(this)} text={'Username'} />
                </View>

                {this.renderMessage()}

                <View style={styles.checkBoxContainer}>
                    <CheckBox tintColors={{ false: 'white' }} />
                    <Text style={styles.propagandaText}>You want to receive emails with our sales and informations?</Text>
                </View>

                {this.renderButtonLoading()}
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
    },
    errorMessage: {
        color: 'red',
        marginTop: 5
    },
    successMessage: {
        color: 'green',
        marginTop: 5
    }
})