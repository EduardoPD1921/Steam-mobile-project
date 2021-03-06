import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { render } from 'react-dom'
import { connect } from 'react-redux'

import axios from 'axios'

import Input from '../components/LoginInput'
import Button from '../components/LoginButton'

import onChangeTextHandler from '../Functions/onChangeTextHandler'

import { View, 
    StyleSheet, 
    Text, 
    Image, 
    TouchableOpacity,
    ActivityIndicator 
} from 'react-native'

import { tryLogin } from '../actions'

class LoginPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            message: '',
            isLoading: false,
            emailError: false,
            passwordError: false,
            loginSuccess: false
        }
    }

    tryLogin() {
        this.setState({ isLoading: true })
        const { email, password } = this.state

        this.props.tryLogin(email, password)
            .then(user => {
                if (user !== null) {
                    this.setState({
                        isLoading: false,
                        message: '',
                        emailError: false,
                        passwordError: false,
                        loginSuccess: false,
                        email: '',
                        password: ''
                    })
                    this.props.navigation.replace('Store')
                }
            })
            .catch(error => {
                this.setState({
                    isLoading: false,
                    message: this.getMessageByErrorCode(error)
                })
            })
        /*this.setState({isLoading: true})
        const { email, password } = this.state

        this.props.tryLogin(email, password)
            .then(user => {
                if (user !== null) {
                    this.setState({
                        isLoading: false,
                        message: '',
                        emailError: false,
                        passwordError: false,
                        loginSuccess: false,
                        email: '',
                        password: ''
                    })
                    this.props.navigation.replace('Store')
                }
            })
            .catch(error => {
                this.setState({isLoading: false, message: this.getMessageByErrorCode(error.code)})
            })*/
    }

    renderButtonLoading() {
        if (this.state.isLoading === true) {
            return (
                <ActivityIndicator style={{marginBottom: 20}} color='#076BBB'></ActivityIndicator>
            )
        }

        return (
            <TouchableOpacity onPress={() => this.tryLogin()}>
                <Button />
            </TouchableOpacity>
        )
    }

    renderMessage() {
        if (!!this.state.message === false) {
            return null
        }

        return (
            <Text style={this.state.loginSuccess ? styles.successMessage: styles.errorMessage}>{this.state.message}</Text>
        )
    }

    getMessageByErrorCode(error) {
        this.setState({
            emailError: false,
            passwordError: false
        })
        
        switch (error) {
            case 'unverified-account':
                this.setState({ emailError: true })
                return 'Unverified account'
            case 'incorrect-password':
                this.setState({ passwordError: true })
                return 'Incorrect password'
            case 'nonexistent-email':
                this.setState({ emailError: true })
                return 'Nonexistent email'
            default:
                return 'Unknown error'
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {/*The content will be in the LinearGradient div*/}
                <LinearGradient colors={['#011228', '#0E487E']} start={{x: 0.8, y: 0.1}} end={{x: 0.4, y: 1}} style={styles.gradient}>
                    <Image source={require('../../images/steamIcon.png')} style={styles.logo}/>
                    <Text style={styles.slogan}>Let the games begin</Text>

                    {/*The bind here is very necessary, because the function was being executed in other component changing the this context*/}
                    <Input first success={this.state.loginSuccess} error={this.state.emailError} text={'Email'} onChangeText={onChangeTextHandler.bind(this)} emailValue={this.state.email} />
                    <Input success={this.state.loginSuccess} error={this.state.passwordError} text={'Password'} onChangeText={onChangeTextHandler.bind(this)} passwordValue={this.state.password} />
                    {this.renderMessage()}
                    <View style={styles.flexView}>
                        <TouchableOpacity>
                            <Text style={[styles.simpleText, {marginTop: 10}]}>Forgot password?</Text>
                        </TouchableOpacity>
                        {this.renderButtonLoading()}
                    </View>

                    <View style={styles.signUpView}>
                        <Text style={styles.simpleText}>Don't have an account?</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
                            <Text style={[styles.simpleText, {color: '#0567FA'}, {marginLeft: 3}]}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        alignItems: 'center'
    },
    logo: {
        width: 80,
        height: 80,
        marginTop: 50
    },
    slogan: {
        color: '#ffffff',
        marginTop: 35,
        fontSize: 13
    },
    flexView: {
        height: 90,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    simpleText: {
        fontSize: 12,
        color: 'white'
    },
    signUpView: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    errorMessage: {
        color: 'red',
        fontSize: 11,
        marginTop: 5
    },
    successMessage: {
        color: 'green',
        fontSize: 11,
        marginTop: 5       
    }
})

export default connect(null, { tryLogin })(LoginPage)