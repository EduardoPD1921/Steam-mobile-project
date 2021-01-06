import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import axios from 'axios'

import ImagePicker from 'react-native-image-picker'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Avatar from '../components/Avatar'
import ProfileInfo from '../components/ProfileInfo'

//import CLIENT_ID from '../../api'

const ProfilePage = props => {
    const [userName, setUsername] = useState(props.userName)
    const [photoUrl, setPhotoUrl] = useState(props.photoUrl)
    const [email, setEmail] = useState(props.email)
    const [phoneNumber, setPhoneNumber] = useState(props.phoneNumber)

    return (
        <View style={styles.mainBackground}>
            <View style={styles.auxiliarContainer}>
                <Icon onPress={() => props.navigation.goBack()} style={styles.goBackArrow} color='white' name='arrow-left' size={30} />
            </View>
            <View style={styles.mainContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.headerText}>My Profile</Text>
                    <Text>Please complete your profile</Text>
                </View>
                <View style={styles.avatar}>
                    <Avatar size={120} />
                    <View style={{ position: 'absolute' }}>
                        <Icon style={styles.cameraIcon} name='camera' color='white' size={30} />
                    </View>
                </View>
                <View style={styles.profileInformation}>
                    <ProfileInfo type='Username' content={userName} />
                    <ProfileInfo type='Email' content={email} />
                    <ProfileInfo type='Phone Number' content={phoneNumber} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainBackground: {
        backgroundColor: '#002350',
        flex: 1
    },
    mainContainer: {
        backgroundColor: '#F1F1F1',
        flex: 1,
        borderTopRightRadius: 34,
        borderTopLeftRadius: 34
    },
    auxiliarContainer: {
        flex: 0.12
    },
    goBackArrow: {
        marginLeft: 10,
        marginTop: 10
    },
    textContainer: {
        margin: 20
    },
    headerText: {
        fontSize: 24,
        fontFamily: 'roboto',
        color: '#3A3333',
        opacity: 0.79,
    },
    subText: {
        fontSize: 11,
        color: '#000000',
        opacity: 0.47
    },
    avatar: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        marginTop: 20
    },
    cameraIcon: {
        marginLeft: 70,
        backgroundColor: '#002350',
        borderRadius: 30,
        padding: 8
    },
    profileInformation: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around'
    }
})

const mapStateToProps = state => {
    if (state.user !== null) {
        return {
            userName: state.user.displayName,
            photoUrl: state.user.photoUrl,
            email: state.user.email,
            phoneNumber: state.user.phoneNumber 
        } 
    } else {
        return {}
    }
}

export default connect(mapStateToProps, null)(ProfilePage)
