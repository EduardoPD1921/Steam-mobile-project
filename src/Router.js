import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import StorePage from './pages/StorePage'
import FriendsPage from './pages/FriendsPage'
import WishlistPage from './pages/WishlistPage'
import ProfilePage from './pages/ProfilePage'
import CustomDrawer from './pages/CustomDrawer'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

function DrawerRoutes() {
    return (
        <Drawer.Navigator drawerType="slide" initialRouteName={'Store'} drawerContent={props => <CustomDrawer {...props} />}>
            <Drawer.Screen name='Profile' component={ProfilePage} />
            <Drawer.Screen name='Store' component={StorePage} />
            <Drawer.Screen name='Friends' component={FriendsPage} />
            <Drawer.Screen name='Wishlist' component={WishlistPage} />
        </Drawer.Navigator>
    )
}

function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Login' component={LoginPage} />
                <Stack.Screen name='Signup' component={SignupPage} />
                <Stack.Screen name='Store' component={DrawerRoutes} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator