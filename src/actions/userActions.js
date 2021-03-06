import axios from 'axios'

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

export const USER_UPDATE_DISPLAYNAME = 'USER_UPDATE_DISPLAYNAME'
export const userUpdateDisplayName = displayName => {
    return {
        type: USER_UPDATE_DISPLAYNAME,
        displayName
    }
}

export const USER_UPDATE_EMAIL = 'USER_UPDATE_EMAIL'
export const userUpdateEmail = email => {
    return {
        type: USER_UPDATE_EMAIL,
        email
    }
}

export const USER_UPDATE_PHONENUMBER = 'USER_UPDATE_PHONENUMBER'
export const userUpdatePhoneNumber = phoneNumber => {
    return {
        type: USER_UPDATE_PHONENUMBER,
        phoneNumber
    }
}

export const USER_UPDATE_PHOTO = 'USER_UPDATE_PHOTO'
export const userUpdatePhoto = photoUrl => {
    return {
        type: USER_UPDATE_PHOTO,
        photoUrl
    }
}

export const tryLogin = ( email, password ) => dispatch => {
    const headers = {
        'Accept':'application/json',
        'Content-type' :'application/json'
    }

    const data = {
        email: email,
        password: password
    }

    return axios({
        method: 'POST',
        url: 'http://192.168.0.14/steam-project-backend/appServer/app/database/login.php',
        headers: headers,
        data: JSON.stringify(data)
    })
        .then(user => {
            const action = userLoginSuccess(user.data)
            dispatch(action)

            return user.data
        })
        .catch(error => {
            return Promise.reject(error.response.data)
        })

    /*return firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
            const action = userLoginSuccess(user)
            dispatch(action)

            return user
        })
        .catch(error => {
            return Promise.reject(error)
        })*/
}