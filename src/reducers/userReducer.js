import { USER_LOGIN_SUCCESS, USER_LOGOUT, USER_UPDATE_PHOTO_URL, USER_UPDATE_EMAIL, USER_UPDATE_DISPLAY_NAME } from '../actions'

const userReducer = (state = null, action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return action.user
        case USER_LOGOUT:
            return null
        case USER_UPDATE_PHOTO_URL:
            return {
                ...state,
                user: {
                    uid: state.user.uid,
                    displayName: state.user.displayName,
                    photoURL: action.photoUrl,
                    email: state.user.email,
                    emailVerified: state.user.emailVerified,
                    phoneNumber: state.user.phoneNumber,
                    isAnonymous: state.user.isAnonymous,
                    tenantId: state.user.tenantId,
                    providerData: state.user.providerData
                }
            }
        case USER_UPDATE_EMAIL:
            return {
                ...state,
                user: {
                    uid: state.user.uid,
                    displayName: state.user.displayName,
                    photoURL: state.user.photoURL,
                    email: action.email,
                    emailVerified: state.user.emailVerified,
                    phoneNumber: state.user.phoneNumber,
                    isAnonymous: state.user.isAnonymous,
                    tenantId: state.user.tenantId,
                    providerData: state.user.providerData
                }
            }
        case USER_UPDATE_DISPLAY_NAME:
            return {
                ...state,
                user: {
                    uid: state.user.uid,
                    displayName: action.displayName,
                    photoURL: state.user.photoURL,
                    email: state.user.email,
                    emailVerified: state.user.emailVerified,
                    phoneNumber: state.user.phoneNumber,
                    isAnonymous: state.user.isAnonymous,
                    tenantId: state.user.tenantId,
                    providerData: state.user.providerData
                }
            }
        default:
            return state
    }
}

export default userReducer