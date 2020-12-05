import React from 'react'
import { Avatar } from 'react-native-paper'

export default ({ image, size }) => {
    return (
        <Avatar.Image source={{ uri: image }} size={size} />
    )
}