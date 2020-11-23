import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import StorePage from './pages/StorePage'

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
            headerShown: false
        }
    },
    'Store': {
        screen: StorePage
    }
})

const AppContainer = createAppContainer(AppNavigator)

export default AppContainer