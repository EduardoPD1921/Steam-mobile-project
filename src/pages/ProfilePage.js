import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'

import axios from 'axios'

import ImagePicker from 'react-native-image-picker'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { AsYouType } from 'libphonenumber-js'

import Avatar from '../components/Avatar'
import ProfileInfo from '../components/ProfileInfo'

import { userUpdateDisplayName, userUpdateEmail, userUpdatePhoneNumber, userUpdatePhoto } from '../actions'

const ProfilePage = props => {
    const [userName, setUsername] = useState(props.userName)
    const [photoUrl, setPhotoUrl] = useState(props.photoUrl)
    const [email, setEmail] = useState(props.email)
    const [phoneNumber, setPhoneNumber] = useState(props.phoneNumber)
    const [userNameWasEdited, setUsernameWasEdited] = useState(false)
    const [photoUrlWasEdited, setPhotoUrlWasEdited] = useState(false)
    const [emailWasEdited, setEmailWasEdited] = useState(false)
    const [phoneNumberWasEdited, setPhoneNumberWasEdited] = useState(false)
    const [message, setMessage] = useState(null)
    const [userNameError, setUserNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [phoneNumberError, setPhoneNumberError] = useState(false)
    const [success, setSuccess] = useState(false)

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
            default:
                console.log('Unknown error')
                break
        }
    }

    function selectImage() {
        const options = {
            maxWidth: 2000,
            maxHeight: 2000,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }

        ImagePicker.showImagePicker(options, response => {
            setPhotoUrlWasEdited(true)

            if (response.didCancel) {
                console.log('User cancelled image picker')
            } else if (response.error) {
                console.log('ImagePicker Error', response.error)
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton)
            } else {
                const source = response

                setPhotoUrl(source.uri)
            }
        })
    }

    function updateProfileInfo() {
        const headers = {
            'Accept':'application/json',
            'Content-type' :'application/json'
        }

        const data = {
            id: props.id,
            email: email,
            userName: userName,
            phoneNumber: phoneNumber,
            photoUrl: photoUrl
        }

        axios({
            method: 'PUT',
            url: 'http://192.168.0.14/steam-project-backend/appServer/app/database/updateInfo.php',
            headers: headers,
            data: JSON.stringify(data)
        })
            .then(resp => {
                setUsernameWasEdited(false)
                setEmailWasEdited(false)
                setPhoneNumberWasEdited(false)
                setPhotoUrlWasEdited(false)
                setEmailError(false)
                setUserNameError(false)
                setPhoneNumberError(false)

                setSuccess(true)

                props.userUpdateDisplayName(userName)
                props.userUpdateEmail(email)
                props.userUpdatePhoneNumber(phoneNumber)
                props.userUpdatePhoto(photoUrl)

                setMessage('Changes saved')
            })
            .catch(error => getMessageByErrorCode(error.response.data))
    }

    function updatePhoneNumber(type, value) {
        const number = new AsYouType().input(value)
        setPhoneNumber(number)
        setPhoneNumberWasEdited(true)
    }

    function getMessageByErrorCode(error) {
        setEmailError(false)
        setUserNameError(false)
        setPhoneNumberError(false)

        switch (error) {
            case 'invalid-phonenumber':
                setPhoneNumberError(true)
                setMessage('Invalid Phone Number')
                break
            case 'email-already-inuse':
                setEmailError(true)
                setMessage('Email already in use')
                break
            case 'invalid-email':
                setEmailError(true)
                setMessage('Invalid email')
                break
            case 'invalid-username':
                setUserNameError(true)
                setMessage('Invalid username')
                break
            default:
                console.log(error)
        }
    }

    function goBackNavigation() {
        if (emailWasEdited === true || userNameWasEdited === true || phoneNumberWasEdited === true || photoUrlWasEdited === true) {
            Alert.alert(
                'Your changes were not saved',
                'Please save your informations',
                [
                    {
                        text: 'Ok'
                    },
                    {
                        text: 'Cancel',
                        style: 'cancel'
                    }
                ],
                { cancelable: false }
            )
        } else {
            setMessage(null)
            setSuccess(false)
            props.navigation.goBack()
        }
    }

    function renderMessage() {
        if (message) {
            if (emailError === true || userNameError === true || phoneNumberError === true) {
                return (
                    <Text style={{ color: 'red' }}>{message}</Text>
                )
            } else {
                return (
                    <Text style={{ color: 'green' }}>{message}</Text>
                )
            }
        }
    }

    return (
        <View style={styles.mainBackground}>
            <View style={styles.auxiliarContainer}>
                <Icon onPress={() => goBackNavigation()} style={styles.goBackArrow} color='white' name='arrow-left' size={30} />
            </View>
            <View style={styles.mainContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.headerText}>My Profile</Text>
                    <Text>Please complete your profile</Text>
                </View>
                <View style={styles.avatar}>
                    <Avatar image={photoUrl} size={120} />
                    <View style={{ position: 'absolute' }}>
                        <TouchableOpacity onPress={() => selectImage()}>
                            <Icon style={styles.cameraIcon} name='camera' color='white' size={30} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.profileInformation}>
                    <ProfileInfo onChangeTextHandler={onChangeText} error={userNameError} success={success} type='Username' content={userName} />
                    <ProfileInfo onChangeTextHandler={onChangeText} error={emailError} success={success} type='Email' content={email} />
                    <ProfileInfo onChangeTextHandler={updatePhoneNumber} error={phoneNumberError} success={success} type='Phone Number' content={phoneNumber} />
                    {renderMessage()}
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

export default connect(mapStateToProps, { userUpdateDisplayName, userUpdateEmail, userUpdatePhoneNumber, userUpdatePhoto })(ProfilePage)
