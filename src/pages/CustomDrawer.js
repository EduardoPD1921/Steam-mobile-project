import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { DrawerItem } from '@react-navigation/drawer'
import { Avatar } from 'react-native-paper'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'

import { userLogout } from '../actions'

function logOut(props) {
    props.userLogout()
    props.navigation.navigate('Login')
}

function CustomDrawer(props) {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.firstHalf}>
                <View style={styles.userInformation}>
                    <Avatar.Image source={require('../../images/profilePicture.png')} size={50} />
                    <Text style={styles.userId}>{props.userName}</Text>
                </View>

                <DrawerItem
                    onPress={() => props.navigation.navigate('Store')} 
                    label='Store' 
                    labelStyle={{ color: 'white' }} 
                    icon={() => <Icon 
                    color='white' 
                    name='cart-outline' 
                    size={20} />} 
                />

                <DrawerItem
                    onPress={() => props.navigation.navigate('Friends')} 
                    label='Friends' 
                    labelStyle={{ color: 'white' }} 
                    icon={() => <Icon 
                    color='white' 
                    name='face-profile' 
                    size={20} />} 
                />
            </View>

            <View style={styles.lastHalf}>
                <DrawerItem
                    onPress={() => logOut(props)}
                    style={styles.logOut} 
                    labelStyle={{ color: 'white' }} 
                    label='Log out' 
                    icon={() => <Icon 
                    color='white' 
                    name='exit-to-app' 
                    size={16} />} 
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: '#152e59'
    },
    firstHalf: {
        flex: 1
    },
    lastHalf: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    userInformation: {
        flexDirection: 'row',
        marginTop: 30,
        paddingLeft: 15
    },
    userId: {
        color: 'white',
        alignSelf: 'center',
        paddingLeft: 10,
        fontSize: 20
    },
    logOut: {
        borderTopWidth: 0.1,
        borderTopColor: 'gray',
        alignSelf: 'stretch' 
    }
})

const mapStateToProps = state => {
    if (state.user !== null) {
        return {
            userName: state.user.user.displayName
        }
    } else {
        return {  }
    }
}

export default connect(mapStateToProps, { userLogout })(CustomDrawer)