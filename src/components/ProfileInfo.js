import React from 'react'
import { TextInput, StyleSheet, View, Text } from 'react-native'

export default ({ isEditing, content, type, onChangeHandler }) => {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.type}>{type}</Text>
            <TextInput 
                editable={isEditing} 
                style={isEditing ? [styles.textInput, {borderBottomColor: 'yellow'}] : styles.textInput} 
                value={content} 
                onChangeText={value => onChangeHandler(value, type)} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 30
    },
    textInput: {
        color: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#DCDEF4'
    },
    type: {
        color: 'white',
        fontSize: 10
    }
})