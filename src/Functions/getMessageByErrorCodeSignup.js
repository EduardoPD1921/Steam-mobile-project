export default function getMessageByErrorCode(error) {
    this.setState({
        emailError: false,
        passwordError: false,
        usernameError: false
    })

    switch (error) {
        case 'auth/invalid-email':
            this.setState({ emailError: true })
            break
        case 'auth/email-already-in-use':
            this.setState({ emailError: true })
            break
        case 'auth/weak-password':
            this.setState({ passwordError: true })
            break
    }
}