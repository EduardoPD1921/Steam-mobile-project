import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import CheckBox from '@react-native-community/checkbox'

import { StatusBar } from 'expo-status-bar'

import axios from 'axios'

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

    trySignup() {
        this.setState({ isLoading: true })

        const headers = {
            'Accept':'application/json',
            'Content-type' :'application/json'
        }

        const data = {
            email: this.state.email,
            password: this.state.password,
            displayName: this.state.username
        }

        axios({
            method: 'POST',
            url: 'http://192.168.0.14/steam-project-backend/appServer/app/database/insert.php',
            headers: headers,
            data: JSON.stringify(data)
        })
            .then(resp => {
                this.setState({
                    isLoading: false,
                    signupSuccess: true,
                    emailError: false,
                    passwordError: false,
                    usernameError: false,
                    message: 'A validation email was sent'
                })
            })
            .catch(error => {
                this.setState({
                    isLoading: false,
                    message: this.getMessageByErrorCode(error.response.data)
                })
            })
    }

    getMessageByErrorCode(error) {
        this.setState({
            emailError: false,
            passwordError: false,
            usernameError: false
        })
        
        switch (error) {
            case 'email-already-exists':
                this.setState({ emailError: true })
                return 'Email already exists'
            case 'weak-password':
                this.setState({ passwordError: true })
                return 'Password is too weak'
            case 'invalid-email':
                this.setState({ emailError: true })
                return 'Invalid email'
            case 'invalid-username':
                this.setState({ usernameError: true })
                return 'Invalid username'
            default:
                return 'Unknown error'
        }
    }

    backNavigation() {
        this.setState({
            username: '',
            password: '',
            email: '',
            message: '',
            signupSuccess: false
        })
        this.props.navigation.goBack()
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
                <Text style={this.state.signupSuccess ? styles.successMessage : styles.errorMessage}>
                    {this.state.message}
                </Text>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.arrowContainer}>
                    <TouchableOpacity onPress={() => this.backNavigation()}>
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