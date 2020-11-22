import React from 'react'
import { TextInput, Text, View, StyleSheet } from 'react-native'

function getInputStyle(error, success) {
    if (error == true) {
        return [styles.textInput, { borderBottomColor: 'red' }]
    } else if (success == true) {
        return [styles.textInput, { borderBottomColor: 'green' }]
    } else {
        return styles.textInput
    }
}

export default ({ text, onChangeTextHandler, error, success }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.inputType}>
                {text}
            </Text>
            <TextInput 
                onChangeText={value => onChangeTextHandler(text.toLowerCase(), value)} 
                secureTextEntry={text == 'Password' ? true : false} 
                style={getInputStyle(error, success)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignContent: 'flex-start'
    },
    inputType: {
        color: 'white',
        fontSize: 11
    },
    textInput: {
        borderBottomWidth: 1,
        borderColor: '#DCDEF4',
        width: 238,
        color: 'white'
    }
})