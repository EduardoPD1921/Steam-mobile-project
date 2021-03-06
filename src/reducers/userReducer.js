import { USER_LOGIN_SUCCESS, USER_LOGOUT, USER_UPDATE_DISPLAYNAME, USER_UPDATE_EMAIL, USER_UPDATE_PHONENUMBER, USER_UPDATE_PHOTO } from '../actions'

const userReducer = (state = null, action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return action.user
        case USER_LOGOUT:
            return null
        case USER_UPDATE_DISPLAYNAME:
            return {
                ...state,
                displayName: action.displayName
            }
        case USER_UPDATE_EMAIL:
            return {
                ...state,
                email: action.email
            }
        case USER_UPDATE_PHONENUMBER:
            return {
                ...state,
                phoneNumber: action.phoneNumber
            }
        case USER_UPDATE_PHOTO:
            return {
                ...state,
                photoUrl: action.photoUrl
            }
        default:
            return state
    }
}

export default userReducer