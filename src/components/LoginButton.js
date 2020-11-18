import React from 'react'
import { View, Text, StyleSheet } from 'react-native'


export default props => {
    return (
        <View style={styles.viewContainer}>
            <Text style={styles.text}>Sign in</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        width: 217,
        height: 45,

        backgroundColor: '#71A6D6',
        borderRadius: 26,

        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 18,
        color: 'black'
    },
})