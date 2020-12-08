import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native'
import firebase from '../firebase'
import { connect } from 'react-redux'

import axios from 'axios'

import ImagePicker from 'react-native-image-picker'
import Avatar from '../components/Avatar'
import ProfileInfo from '../components/ProfileInfo'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
/*import Progress from 'react-native-progress'*/

import { userUpdatePhotoUrl, userUpdateEmail, userUpdateDisplayName } from '../actions'

import CLIENT_ID from '../../api'

function ProfileScreen(props) {
    const [image, setImage] = useState(null)
    const [imageInfo, setImageInfo] = useState(null)
    const [displayName, setDisplayName] = useState(props.displayName)
    const [email, setEmail] = useState(props.email)
    const [isEditing, setIsEditing] = useState(false)

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

    function updateUserInformations() {
        setIsEditing(false)

        if (image) {
            const data = new FormData()

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
                    setImage(res.data.data.link)

                    firebase.auth().currentUser.updateProfile({
                        photoURL: res.data.data.link
                    })

                    props.userUpdatePhotoUrl(res.data.data.link)
                }).catch(e => {
                    console.log(e)
                })
        }

        firebase.auth().currentUser.updateEmail(email)
            .then(() => {
                props.userUpdateEmail(email)
            })
            .catch(e => console.log(e))
        
        firebase.auth().currentUser.updateProfile({
            displayName: displayName
        }).then(() => {
            props.userUpdateDisplayName(displayName)
        }).catch(e => console.log(e))
    }

    function currentProfileImage() {
        if (image !== null) {
            return image
        } else {
            return props.photoURL
        }
    }

    function onChangeInformationsHandler(content, field) {
        switch (field) {
            case 'Email':
                setEmail(content)
                break
            case 'Username':
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
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Profile informations</Text>
                    <TouchableOpacity onPress={() => {
                        setIsEditing(true)
                    }}>
                        <Icon color='white' name='account-edit' size={30} />
                    </TouchableOpacity>
                </View>
                <ProfileInfo isEditing={isEditing} content={email} type='Email' onChangeHandler={onChangeInformationsHandler} />
                <ProfileInfo isEditing={isEditing} content={displayName} type='Username' onChangeHandler={onChangeInformationsHandler} />
                <TouchableOpacity style={{ marginTop: 10 }} onPress={() => {
                    updateUserInformations()
                }}>
                    <Icon name='content-save-edit' color='white' size={30} />
                </TouchableOpacity>
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
        alignSelf: 'center',
        width: Dimensions.get('screen').width / 1.2,
        marginTop: 30,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerTitle: {
        color: 'white',
        fontSize: 15,
        margin: 5
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

export default connect(mapStateToProps, { userUpdatePhotoUrl, userUpdateDisplayName, userUpdateEmail })(ProfileScreen)