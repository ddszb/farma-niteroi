import React from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';

import  {DosesStackNavigator, MedStackNavigator, SearchStackNavigator} from './StackNavigator'

import Info from '../views/Info/Info'

import colors from '../styles/colors';


const Tab = createBottomTabNavigator()


function __getTabBarVisiblity(route){
    noTabRoutes = ["Adicionar Medicamento", "Adicionar Dose", "Tutorial", "Sobre", "Medicamentos da Prefeitura", "Policlínicas", "Medicamentos Niterói"]
    const routeName = getFocusedRouteNameFromRoute(route)
    return noTabRoutes.includes(routeName) ? 'none' : 'flex'
}

export default props =>(
    <Tab.Navigator 
    screenOptions={({ route }) => ({
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.grey6,
        tabBarShowLabel: true,
        tabBarLabelStyle: {fontSize: 12},
        tabBarStyle:{ height: 50},
        tabBarIcon: ({ focused, color, size }) => {
            let iconName
            switch (route.name){
                case 'Doses':
                    iconName = focused
                    ? 'home'
                    : 'home-outline'
                    break
                case 'Medicamentos':
                    iconName = focused
                    ? 'medkit'
                    : 'medkit-outline'
                    break
                case 'Procurar':
                    iconName = focused
                    ? 'search'
                    : 'search-outline'
                    break
                case 'Informação':
                    iconName = focused
                    ? 'md-book'
                    : 'md-book-outline'
                    break
            }
                        
            return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
     initialRouteName="Doses">
        <Tab.Screen 
            name="Doses"
            component={DosesStackNavigator}             
            options={({ route }) => ({
                headerShown: false,
                tabBarStyle: {display: __getTabBarVisiblity(route)}
            })}/>
        <Tab.Screen 
            name="Medicamentos" 
            component={MedStackNavigator} 
            options={({ route }) => ({
                headerShown: false,
                tabBarStyle: {display: __getTabBarVisiblity(route)}
            })}/>
        <Tab.Screen 
            name="Procurar" 
            options={({ route }) => ({
                headerShown: false,
                tabBarStyle: {display: __getTabBarVisiblity(route)}
            })}
            component={SearchStackNavigator}/>
        <Tab.Screen 
            name="Informação"
            
            options={({ route }) => ({
                headerShown: false,
                title: "Dicas de Saúde",
                tabBarStyle: {display: __getTabBarVisiblity(route)}
            })}
            component={Info}/>
    </Tab.Navigator>
)

