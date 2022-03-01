import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
	getFocusedRouteNameFromRoute,
	ParamListBase,
	RouteProp,
} from '@react-navigation/core';

import {
	DosesStackNavigator,
	MedStackNavigator,
	SearchStackNavigator,
} from './StackNavigator';

import Info from '../views/Info';

import colors from '../assets/colors';
import {DrawerNavigatorParamList} from './DrawerNavigator';
const Tab = createBottomTabNavigator();

const __getTabBarVisiblity = (
	route: RouteProp<ParamListBase, 'Info' | 'Doses' | 'MedsList' | 'Search'>,
): 'none' | 'flex' => {
	const noTabRoutes = [
		'AddMeds',
		'AddDose',
		'Tutorial',
		'About',
		'NiteroiMeds',
		'HealthCenters',
	];
	const routeName = getFocusedRouteNameFromRoute(route);
	return noTabRoutes.includes(routeName || route.name) ? 'none' : 'flex';
};

const TabNavigator: React.FC<{
	route: RouteProp<DrawerNavigatorParamList, 'DosesDrawer'>;
}> = () => (
	<Tab.Navigator
		screenOptions={({route}) => ({
			headerShown: false,
			tabBarActiveTintColor: colors.white,
			tabBarInactiveTintColor: colors.grey8,
			tabBarActiveBackgroundColor: colors.tabBackground,
			tabBarInactiveBackgroundColor: colors.tabBackground,
			tabBarShowLabel: false,
			tabBarStyle: {height: 50},
			tabBarIcon: ({focused, color, size}) => {
				let iconName = '';
				switch (route.name) {
					case 'Doses':
						iconName = focused ? 'home' : 'home-outline';
						break;
					case 'MedsList':
						iconName = focused ? 'medkit' : 'medkit-outline';
						break;
					case 'Search':
						iconName = focused ? 'search' : 'search-outline';
						break;
					case 'Info':
						iconName = focused ? 'md-book' : 'md-book-outline';
						break;
				}

				return <Ionicons name={iconName} size={30} color={color} />;
			},
		})}
		initialRouteName="Doses">
		<Tab.Screen
			name="Doses"
			component={DosesStackNavigator}
			options={({route}) => ({
				headerShown: false,
				title: 'Doses do dia',
				tabBarStyle: {display: __getTabBarVisiblity(route)},
			})}
		/>
		<Tab.Screen
			name="MedsList"
			component={MedStackNavigator}
			options={({route}) => ({
				headerShown: false,
				title: 'Medicamentos',
				tabBarStyle: {display: __getTabBarVisiblity(route)},
			})}
		/>
		<Tab.Screen
			name="Search"
			options={({route}) => ({
				headerShown: false,
				title: 'Procurar',
				tabBarStyle: {display: __getTabBarVisiblity(route)},
			})}
			component={SearchStackNavigator}
		/>
		<Tab.Screen
			name="Info"
			options={({route}) => ({
				headerShown: false,
				title: 'Dicas de Saúde',
				tabBarStyle: {display: __getTabBarVisiblity(route)},
			})}
			component={Info}
		/>
	</Tab.Navigator>
);

export default TabNavigator;
