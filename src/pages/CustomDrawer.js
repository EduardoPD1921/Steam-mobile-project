import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { DrawerItem } from '@react-navigation/drawer'
import { Drawer, Switch } from 'react-native-paper'
import { Picker } from '@react-native-picker/picker'

import Avatar from '../components/Avatar'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { connect } from 'react-redux'

import { userLogout } from '../actions'

class CustomDrawer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            userStatus: 'online'
        }
    }

    logOut() {
        this.props.userLogout()
        this.props.navigation.navigate('Login')
    }

    getUserStatusColor() {
        switch (this.state.userStatus) {
            case 'online':
                return 'green'
            case 'idle':
                return 'orange'
            case 'offline':
                return 'gray'
            default:
                return 'green'
        }
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.firstHalf}>
                    <Drawer.Section>
                        <View style={styles.userInformation}>
                            <Avatar image={this.props.photoURL} size={50} />
                            <Text style={styles.userId}>{this.props.userName}</Text>
                            <Icon 
                                style={styles.userStatus} 
                                color={this.getUserStatusColor()} 
                                name='checkbox-blank-circle' 
                                size={10} 
                            />
                            <Picker 
                                selectedValue={this.state.userStatus} 
                                onValueChange={(itemValue, itemIndex) => this.setState({ userStatus: itemValue })} 
                                style={styles.dropDownStatus}
                            >
                                <Picker.Item label='Online' value='online' />
                                <Picker.Item label='Idle' value='idle' />
                                <Picker.Item label='Offline' value='offline' />
                            </Picker>
                        </View>

                        <DrawerItem 
                            onPress={() => this.props.navigation.navigate('Profile')} 
                            label='Profile' 
                            labelStyle={{ color: 'white' }} 
                            icon={() => <Icon 
                            color='white' 
                            name='account-outline' 
                            size={20} />} 
                        />

                        <DrawerItem
                            onPress={() => this.props.navigation.navigate('Store')} 
                            label='Store' 
                            labelStyle={{ color: 'white' }} 
                            icon={() => <Icon 
                            color='white' 
                            name='cart-outline' 
                            size={20} />} 
                        />

                        <DrawerItem
                            onPress={() => this.props.navigation.navigate('Friends')} 
                            label='Friends' 
                            labelStyle={{ color: 'white' }} 
                            icon={() => <Icon 
                            color='white' 
                            name='face-profile' 
                            size={20} />} 
                        />

                        <DrawerItem
                            onPress={() => this.props.navigation.navigate('Wishlist')} 
                            label='Wishlist' 
                            labelStyle={{ color: 'white' }} 
                            icon={() => <Icon 
                            color='white' 
                            name='format-list-bulleted' 
                            size={20} />} 
                        />
                    </Drawer.Section>
                </View>

                <View style={styles.lastHalf}>
                    <Drawer.Section 
                        theme={{ colors: { text: 'white' } }} 
                        style={styles.preferencesSection} 
                        title='Preferences'
                    >
                        <View style={styles.sectionView}>
                            <Text style={{ color: 'white' }}>Dark mode</Text>
                            <Switch />
                        </View>
                    </Drawer.Section>
                    <View style={styles.logoutView}>
                        <DrawerItem
                            onPress={() => this.logOut()}
                            style={styles.logOut} 
                            labelStyle={{ color: 'white' }} 
                            label='Log out' 
                            icon={() => <Icon 
                            color='white' 
                            name='exit-to-app' 
                            size={16} />} 
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: '#152e59'
    },
    firstHalf: {
        flex: 1
    },
    lastHalf: {
        flex: 1,
        flexDirection: 'column'
    },
    userInformation: {
        flexDirection: 'row',
        marginTop: 30,
        paddingLeft: 15
    },
    userId: {
        color: 'white',
        alignSelf: 'center',
        paddingLeft: 10,
        fontSize: 20
    },
    userStatus: {
        alignSelf: 'center',
        marginLeft: 10
    },
    logOut: {
        borderTopWidth: 0.1,
        borderTopColor: 'gray',
        alignSelf: 'stretch' 
    },
    dropDownStatus: {
        alignSelf: 'center',
        width: 40,
        height: 40
    },
    sectionView: {
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 17,
        justifyContent: 'space-between'
    },
    logoutView: {
        flex: 1,
        justifyContent: 'flex-end'
    },
})

const mapStateToProps = state => {
    if (state.user !== null) {
        return {
            userName: state.user.user.displayName,
            photoURL: state.user.user.photoURL
        }
    } else {
        return {  }
    }
}

export default connect(mapStateToProps, { userLogout })(CustomDrawer)