import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import LoginPage from './pages/LoginPage'

const AppNavigator = createStackNavigator({
    'Login': {
        screen: LoginPage,
        navigationOptions: {
            headerShown: false
        }
    }
})

const AppContainer = createAppContainer(AppNavigator)

export default AppContainer