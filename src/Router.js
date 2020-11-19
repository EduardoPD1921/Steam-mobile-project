import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

const AppNavigator = createStackNavigator({
    'Login': {
        screen: LoginPage,
        navigationOptions: {
            headerShown: false
        }
    },
    'Signup': {
        screen: SignupPage,
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#152e59'
            }
        }
    }
})

const AppContainer = createAppContainer(AppNavigator)

export default AppContainer