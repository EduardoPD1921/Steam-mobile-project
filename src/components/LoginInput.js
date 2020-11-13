import React from 'react'
import { TextInput, Text, StyleSheet, View, Image } from 'react-native'

export default ({ first, text }) => {
    return (
        <View style={first ? styles.emailContainer : styles.passwordContainer}>
            <Text style={styles.text}>{text}</Text>
            <Image style={first ? styles.emailIcon : styles.passwordIcon} source={first ? require('../../images/emailIcon.png') : require('../../images/padlockIcon.png')}/>
            <TextInput style={styles.textInput} secureTextEntry={first ? false : true}/>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 11,
        color: 'white',
        marginLeft: 6
    },
    textInput: {
        width: 230,
        height: 40,
        paddingLeft: 35,
        borderRadius: 10,
        backgroundColor: '#71A6D6',
        zIndex: 0
    },
    emailContainer: {
        marginTop: 60
    },
    passwordContainer: {
        marginTop: 35
    },
    emailIcon: {
        width: 18,
        height: 18,
        marginTop: 25,
        marginLeft: 10,

        position: 'absolute',
        zIndex: 1
    },
    passwordIcon: {
        width: 36,
        height: 36,
        marginTop: 16,

        position: 'absolute',
        zIndex: 1
    }
})