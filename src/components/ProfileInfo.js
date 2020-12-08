import React from 'react'
import { TextInput, StyleSheet, View, Text } from 'react-native'

function getColorByErrorStatus(emailError, displayNameError, isEditing, emailSuccess, displayNameSuccess) {
    if (emailError || displayNameError) {
        return [styles.textInput, { borderBottomColor: 'red' }]
    } else if (isEditing) {
        return [styles.textInput, { borderBottomColor: 'orange' }]
    } else if (emailSuccess || displayNameSuccess) {
        return [styles.textInput, { borderBottomColor: 'green' }]
    } else {
        return styles.textInput
    }
}

export default ({ isEditing, content, type, onChangeHandler, emailError, displayNameError, emailSuccess, displayNameSuccess }) => {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.type}>{type}</Text>
            <TextInput 
                editable={isEditing} 
                style={getColorByErrorStatus(emailError, displayNameError, isEditing, emailSuccess, displayNameSuccess)} 
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