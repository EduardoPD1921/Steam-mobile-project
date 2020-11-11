import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

const AppNavigator = createStackNavigator({
    'Login': {

    }
})

const AppContainer = createAppContainer(AppNavigator)

export default AppContainer