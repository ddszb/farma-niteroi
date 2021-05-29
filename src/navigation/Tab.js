import React from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../views/Home'
import Info from '../views/Info'
import MedList from '../views/MedList/MedList'
import MedForm from '../views/MedForm/MedForm'
import Search from '../views/Search'

const Tab = createBottomTabNavigator()

const MedsStack = createStackNavigator()

function MedStackScreen() {
    return (
        <MedsStack.Navigator>
            <MedsStack.Screen name="MedList" component={MedList}/>
            <MedsStack.Screen name="MedForm" component={MedForm}/>
        </MedsStack.Navigator>
    )

}

export default props =>(
    <Tab.Navigator 
    screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            let iconName
            switch (route.name){
                case 'Home':
                    iconName = focused
                    ? 'home'
                    : 'home-outline'
                    break
                case 'Med':
                    iconName = focused
                    ? 'medkit'
                    : 'medkit-outline'
                    break
                case 'Search':
                    iconName = focused
                    ? 'search'
                    : 'search-outline'
                    break
                case 'Info':
                    iconName = focused
                    ? 'help'
                    : 'help-outline'
                    break
            }
                        
            return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    tabBarOptions={{
        activeTintColor: '#721dab',
        inactiveTintColor: '#5f5f5f',
        showLabel: true,
        labelStyle: {fontSize: 10}
    }} initialRouteName="Home">
        <Tab.Screen name="Home" component={Home}/>
        <Tab.Screen name="Med" component={MedStackScreen}/>
        <Tab.Screen name="Search" component={Search}/>
        <Tab.Screen name="Info" component={Info}/>
    </Tab.Navigator>
)

