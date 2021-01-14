import React from 'react'
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native'

function getInputStyle(error, success) {
    if (error == true) {
        return [styles.textInput, { borderColor: 'red', borderWidth: 1 }]
    } else if (success == true) {
        return [styles.textInput, { borderColor: 'green', borderWidth: 1 }]
    } else {
        return styles.textInput
    }
}

export default ({ type, content, onChangeTextHandler, error, success }) => {
    return (
        <View>
            <Text style={styles.typeText}>{type}</Text>
            <TextInput 
                onChangeText={value => onChangeTextHandler(type, value)} 
                style={getInputStyle(error, success)} 
                value={content}  
            />
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