import React from 'react'
import { TextInput, Text, View, StyleSheet } from 'react-native'

export default ({ text, onChangeTextHandler }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.inputType}>
                {text}
            </Text>
            <TextInput 
                onChangeText={value => onChangeTextHandler(text.toLowerCase(), value)} 
                secureTextEntry={text == 'Password' ? true : false} 
                style={styles.textInput}
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