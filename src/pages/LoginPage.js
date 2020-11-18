import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import firebase from 'firebase'
import { render } from 'react-dom'
import { connect } from 'react-redux'

import Input from '../components/LoginInput'
import Button from '../components/LoginButton'

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
            isLoading: false
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

    onChangeTextHandler(type, value) {
        this.setState({
            [type]: value
        })
    }

    getMessageByErrorCode(error) {
        switch (error) {
            case 'auth/wrong-password':
                return 'Incorrect password'
            case 'auth/invalid-email':
                return 'Invalid email'
            case 'auth/user-not-found':
                return 'User not found'
            default:
                return 'Unknown error'
        }
    }

    tryLogin() {
        this.setState({isLoading: true})
        const { email, password } = this.state

        this.props.tryLogin(email, password)
            .then(user => {
                this.setState({isLoading: false, message: ''})
                console.log(user)
            })
            .catch(error => {
                this.setState({isLoading: false, message: this.getMessageByErrorCode(error.code)})
            })
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

    renderErrorMessage() {
        if (!!this.state.message === false) {
            return null
        }

        return (
            <Text style={styles.errorMessage}>{this.state.message}</Text>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {/*The content will be in the LinearGradient div*/}
                <LinearGradient colors={['#011228', '#0E487E']} start={{x: 0.8, y: 0.1}} end={{x: 0.4, y: 1}} style={styles.gradient}>
                    <Image source={require('../../images/steamIcon.png')} style={styles.logo}/>
                    <Text style={styles.slogan}>Let the games begin</Text>

                    {/*The bind here is very necessary, because the function was being executed in other component changing the this context*/}
                    <Input first text={'Email'} onChangeText={this.onChangeTextHandler.bind(this)} emailValue={this.state.email} />
                    <Input text={'Password'} onChangeText={this.onChangeTextHandler.bind(this)} passwordValue={this.state.password} />
                    {this.renderErrorMessage()}
                    <View style={styles.flexView}>
                        <TouchableOpacity>
                            <Text style={[styles.simpleText, {marginTop: 10}]}>Forgot password?</Text>
                        </TouchableOpacity>
                        {this.renderButtonLoading()}
                    </View>

                    <View style={styles.signUpView}>
                        <Text style={styles.simpleText}>Don't have an account?</Text>
                        <TouchableOpacity>
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
    }
})

export default connect(null, { tryLogin })(LoginPage)