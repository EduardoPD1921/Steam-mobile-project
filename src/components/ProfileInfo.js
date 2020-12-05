import React from 'react'
import { TextInput } from 'react-native'

export default ({ isEditing, content, type, onChangeHandler }) => {
    if (isEditing == true) {
        return (
            <TextInput value={content} onChangeText={value => onChangeHandler(value, type)} />
        )
    }
}