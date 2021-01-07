import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
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
    const [userNameWasEdited, setUsernameWasEdited] = useState(false)
    const [photoUrlWasEdited, setPhotoUrlWasEdited] = useState(false)
    const [emailWasEdited, setEmailWasEdited] = useState(false)
    const [phoneNumberWasEdited, setPhoneNumberWasEdited] = useState(false)

    function onChangeText(type, value) {
        switch (type) {
            case 'Email':
                setEmail(value)
                setEmailWasEdited(true)
                break
            case 'Username':
                setUsername(value)
                setUsernameWasEdited(true)
                break
            case 'Phone Number':
                setPhoneNumber(value)
                setPhoneNumberWasEdited(true)
                break
            default:
                console.log('Unknow error')
                break
        }
    }

    function updateProfileInfo() {
        let data = {
            id: props.id
        }
        
        if (emailWasEdited === true) {
            data = {
                ...data,
                email: email
            }
        }

        if (userNameWasEdited === true) {
            data = {
                ...data,
                userName: userName
            }
        }

        if (phoneNumberWasEdited === true) {
            data = {
                ...data,
                phoneNumber: phoneNumber
            }
        }

        const headers = {
            'Accept':'application/json',
            'Content-type' :'application/json'
        }

        axios({
            method: 'PUT',
            url: 'http://192.168.0.14/steam-project-backend/appServer/app/database/updateInfo.php',
            headers: headers,
            data: JSON.stringify(data)
        })
            .then(resp => console.log(resp))
            .catch(error => console.log(error.response))
    }

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
                    <ProfileInfo onChangeTextHandler={onChangeText} type='Username' content={userName} />
                    <ProfileInfo onChangeTextHandler={onChangeText} type='Email' content={email} />
                    <ProfileInfo onChangeTextHandler={onChangeText} type='Phone Number' content={phoneNumber} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <TouchableOpacity onPress={() => updateProfileInfo()} style={styles.saveButton}>
                        <Text style={{ fontSize: 15, textAlign: 'center' }}>Save</Text>
                    </TouchableOpacity>
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
        flex: 0.8,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    saveButton: {
        backgroundColor: '#0e94dc',
        width: 50,
        height: 30,
        borderRadius: 5,
        justifyContent: 'center',
        marginRight: 45
    }
})

const mapStateToProps = state => {
    if (state.user !== null) {
        return {
            id: state.user.id,
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
