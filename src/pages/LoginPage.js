import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import firebase from 'firebase'
import { render } from 'react-dom'

import { View, StyleSheet, Text } from 'react-native'

class LoginPage extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                {/*The content will be in the LinearGradient div*/}
                <LinearGradient colors={['#2974FA', '#38ABFD', '#43D4FF']} style={styles.gradient}>
                    <Text style={styles.text}>
                        Teste
                    </Text>
                </LinearGradient>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    gradient: {
        flex: 1,
    },
    text: {
        textAlign: 'center'
    }
})

export default LoginPage