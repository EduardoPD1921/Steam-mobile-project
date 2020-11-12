import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import firebase from 'firebase'
import { render } from 'react-dom'

import { View, StyleSheet, Text, Image, TextInput, Platform } from 'react-native'

class LoginPage extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                {/*The content will be in the LinearGradient div*/}
                <LinearGradient colors={['#011228', '#0E487E']} start={{x: 0.8, y: 0.1}} end={{x: 0.4, y: 1}} style={styles.gradient}>
                    <Image source={require('../../images/steamIcon.png')} style={styles.logo}/>
                    <Text style={styles.slogan}>Let the games begin</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.emailText}>Email</Text>
                        <TextInput style={styles.textInput} />
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
        resizeMode: 'contain',
        marginTop: 50
    },
    slogan: {
        color: '#ffffff',
        marginTop: 35,
        fontSize: 13
    },
    inputContainer: {
        marginTop: 60
    },
    textInput: {
        width: 230,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#71A6D6',
    },
    emailText: {
        color: 'white',
        marginLeft: 6,
        fontSize: 11
    }
})

export default LoginPage