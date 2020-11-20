import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default props => {
    return (
        <View style={styles.buttonContainer}>
            <Text style={styles.signupText}>Sign up</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 238,
        height: 35,
        backgroundColor: '#365D90',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    signupText: {
        color: 'white',
        fontSize: 18
    }
})