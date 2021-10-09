import React from 'react'

import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

//Navigator
import {DrawerContent} from './DrawerContent'
import Tab from './Tab'
import Tutorial from '../views/Tutorial/Tutorial';
import About from '../views/About/About';


const Drawer = createDrawerNavigator();


/**
 * Drawer Navigator para o app.
 * Telas do drawer: "Tutorial"
 * @returns DrawerNavigator
 */
export const DrawerNavigator = () =>{
    return (
        <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props}/>}
        initialRouteName="DosesDrawer">
            <Drawer.Screen 
                name="DosesDrawer"
                options={{headerShown: false}}
                component={Tab}             
            />
            <Drawer.Screen
                name="Tutorial"
                options={{headerShown: false}}
                component={Tutorial}/>
            <Drawer.Screen
                name="Sobre"
                options={{headerShown: true}}
                component={About}/>
        </Drawer.Navigator>
    )
}
