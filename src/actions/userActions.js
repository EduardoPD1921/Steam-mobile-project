import firebase from 'firebase'

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
const userLoginSuccess = user => {
    return {
        type: USER_LOGIN_SUCCESS,
        user
    }
}

export const USER_LOGOUT = 'USER_LOGOUT'
export const userLogout = () => {
    return {
        type: USER_LOGOUT
    }
}

export const tryLogin = ( email, password ) => dispatch => {
    return firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
            const action = userLoginSuccess(user)
            dispatch(action)

            return user
        })
        .catch(error => {
            return Promise.reject(error)
        })
}

export const USER_UPDATE_PHOTO_URL = 'USER_UPDATE_PHOTO_URL'
export const userUpdatePhotoUrl = photoUrl => {
    return {
        type: USER_UPDATE_PHOTO_URL,
        photoUrl
    }
}

export const USER_UPDATE_EMAIL = 'USER_UPDATE_EMAIL'
export const userUpdateEmail = email => {
    return {
        type: USER_UPDATE_EMAIL,
        email
    }
}

export const USER_UPDATE_DISPLAY_NAME = 'USER_UPDATE_DISPLAY_NAME'
export const userUpdateDisplayName = displayName => {
    return {
        type: USER_UPDATE_DISPLAY_NAME,
        displayName
    }
}