import React from 'react'
import {
    SafeAreaView,
}  from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import Tab from './Tab'
import { DrawerNavigator } from './DrawerNavigator'
import { AppProvider } from '../context/context'

export default props =>(
    <SafeAreaView style={{flex: 1}}>
        <AppProvider>
            <NavigationContainer>
                <DrawerNavigator/>
            </NavigationContainer>
        </AppProvider>
    </SafeAreaView>
)

