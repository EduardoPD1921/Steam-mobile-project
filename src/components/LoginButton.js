import React from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native'


export default props => {
    return (
        <TouchableOpacity>
            <View style={styles.viewContainer}>
                <Text style={styles.text}>Sign in</Text>
            </View>
        </TouchableOpacity>
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
        color: 'white'
    },
})