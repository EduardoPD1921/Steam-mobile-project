import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import StorePage from './pages/StorePage'
import FriendsPage from './pages/FriendsPage'
import { Header } from 'react-native/Libraries/NewAppScreen'

// const AppNavigator = createStackNavigator({
//     'Login': {
//         screen: LoginPage,
//         navigationOptions: {
//             headerShown: false
//         }
//     },
//     'Signup': {
//         screen: SignupPage,
//         navigationOptions: {
//             headerShown: false
//         }
//     },
//     'Store': {
//         screen: StorePage,
//         navigationOptions: {
//             headerShown: false
//         }
//     }
// })

// const AppContainer = createAppContainer(AppNavigator)

// export default AppContainer

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

function DrawerRoutes() {
    return (
        <Drawer.Navigator initialRouteName='Store'>
            <Drawer.Screen name='Store' component={StorePage} />
            <Drawer.Screen name='Friends' component={FriendsPage} />
        </Drawer.Navigator>
    )
}

function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Login' component={LoginPage} />
                <Stack.Screen name='Signup' component={SignupPage} />
                <Stack.Screen name='Store' component={DrawerRoutes} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator