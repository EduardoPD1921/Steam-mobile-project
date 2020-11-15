import firebase from 'firebase'

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
const userLoginSuccess = user => {
    return {
        type: USER_LOGIN_SUCCESS,
        user
    }
}

export const USER_LOGOUT = 'USER_LOGOUT'
const userLogout = () => {
    return {
        type: USER_LOGOUT
    }
}