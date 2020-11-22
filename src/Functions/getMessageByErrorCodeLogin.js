export default function getMessageByErrorCode(error) {
    switch (error) {
        case 'auth/wrong-password':
            return 'Incorrect password'
        case 'auth/invalid-email':
            return 'Invalid email'
        case 'auth/user-not-found':
            return 'User not found'
        default:
            return 'Unknown error'
    }
}