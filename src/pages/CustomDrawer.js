import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function CutomDrawer(props) {
    return (
        <View>
            <Text style={styles.test}>Teste</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    test: {
        marginTop: 50
    }
})