import React from 'react'
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native'

export default ({ type, content }) => {
    return (
        <View>
            <Text style={styles.typeText}>{type}</Text>
            <TextInput style={styles.textInput} value={content} />
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: 'white',
        width: Dimensions.get('window').width - 70,
        borderRadius: 36,
        paddingLeft: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5
    },
    typeText: {
        marginLeft: 5,
        marginBottom: 5,
        fontSize: 13,
        fontFamily: 'roboto',
        opacity: 0.47,
        color: 'black'
    }
})