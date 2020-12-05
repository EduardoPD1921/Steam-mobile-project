import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform, Alert } from 'react-native'
import firebase from '../firebase'
import { connect } from 'react-redux'

import axios from 'axios'

import ImagePicker from 'react-native-image-picker'
import Avatar from '../components/Avatar'
import ProfileInfo from '../components/ProfileInfo'
/*import Progress from 'react-native-progress'*/

import CLIENT_ID from '../../api'

function ProfileScreen(props) {
    const [image, setImage] = useState(null)
    const [imageInfo, setImageInfo] = useState(null)
    const [displayName, setDisplayName] = useState(props.displayName)
    const [email, setEmail] = useState(props.email)

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
            if (response.didCancel) {
                console.log('User cancelled image picker')
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton)
            } else {
                const source = response
                
                setImage(source.uri)
                setImageInfo(source)
                console.log(source)
            }
        })
    }

    function uploadImage() {
        /*const data = new FormData()

        data.append('image', {
            fileName: imageInfo.fileName,
            uri: imageInfo.uri,
            type: imageInfo.type
        })

        const uploadConfig = {
            method: 'POST',
            body: data,
            headers: {
                'Authorization': `Client-ID ${CLIENT_ID}`
            }
        }

        axios.post('https://api.imgur.com/3/image', data, uploadConfig)
            .then(res => {
                console.log(res.data.data.link)
                setImage(res.data.data.link)

                firebase.auth().currentUser.updateProfile({
                    photoURL: res.data.data.link
                })
            }).catch(e => {
                console.log(e)
            })*/
    }

    function currentProfileImage() {
        if (image !== null) {
            console.log('test1')
            return image
        } else {
            console.log('test2')
            return props.photoURL
        }
    }

    function onChangeInformationsHandler(content, field) {
        switch (field) {
            case 'email':
                setEmail(content)
                break
            case 'displayName':
                setDisplayName(content)
                break
            default:
                console.log('error')
        }
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.avatarContainer}>
                <Avatar image={currentProfileImage()} size={100} />
                <TouchableOpacity style={styles.chooseImageButton} onPress={selectImage}>
                    <Text style={{ color: 'white' }}>Choose an image</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.profileInformations}>
                {console.log(props.displayName)}
                <ProfileInfo isEditing={true} value='email' content={email} type='email' onChangeHandler={onChangeInformationsHandler} />
                <ProfileInfo isEditing={true} value='displayName' content={displayName} type='displayName' onChangeHandler={onChangeInformationsHandler} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#141D68'
    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: 20
    },
    chooseImageButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#0569FE',
        borderRadius: 5
    },
    profileInformations: {
        backgroundColor: '#1C2A50',
        alignSelf: 'center'
    }
})

function mapStateToProps(state) {
    if (state.user !== null) {
        return {
            email: state.user.user.email,
            displayName: state.user.user.displayName,
            photoURL: state.user.user.photoURL
        }
    } else {
        return {}
    }
}

export default connect(mapStateToProps, null)(ProfileScreen)