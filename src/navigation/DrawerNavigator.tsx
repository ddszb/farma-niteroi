import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

//Navigator
import DrawerMenu from './DrawerMenu';
import TabNavigator from './TabNavigator';
import Tutorial from '../views/Tutorial';
import About from '../views/About/About';
import colors from '../assets/colors';
import MedsNiteroi from '../views/MedsNiteroi/MedsNiteroi';
import Search from '../views/Search';
import HealthCenters from '../views/HealthCenters';
import Med from '../Models/Med';

const Drawer = createDrawerNavigator();

export type DrawerNavigatorParamList = {
	DosesDrawer: undefined;
	Tutorial: {hideWelcome?: boolean};
	About: undefined;
	Home: undefined;
	MedsList: undefined;
	NiteroiMeds: undefined;
	HealthCenters: undefined;
	Search: undefined;
	Info: undefined;
	MedDetail: {med: Med};
	AddDose: undefined;
};
/**
 * Drawer Navigator para o app.
 * Telas do drawer: "Tutorial"
 * @returns DrawerNavigator
 */
const DrawerNavigator: React.FC = () => {
	return (
		<Drawer.Navigator
			drawerContent={props => <DrawerMenu {...props} />}
			initialRouteName="Home">
			<Drawer.Screen
				name="Home"
				options={{
					headerShown: false,
					drawerLabel: 'Doses do Dia',
					title: 'Doses do Dia',
				}}
				component={TabNavigator}
			/>
			<Drawer.Screen
				name="Tutorial"
				options={{headerShown: false, drawerLabel: 'Tutorial'}}
				component={Tutorial}
			/>
			<Drawer.Screen
				name="About"
				options={{
					headerShown: true,
					drawerActiveTintColor: colors.primary,
					headerTintColor: colors.primary,
					drawerLabel: 'Sobre',
					title: 'Sobre',
				}}
				component={About}
			/>
			<Drawer.Screen
				options={{headerShown: false}}
				name="SearchStack"
				component={Search}
			/>
			<Drawer.Screen
				options={{headerTitle: 'Medicamentos da Prefeitura'}}
				name="NiteroiMeds"
				component={MedsNiteroi}
			/>
			<Drawer.Screen
				options={{headerTitle: 'Policlínicas'}}
				name="HealthCenters"
				component={HealthCenters}
			/>
		</Drawer.Navigator>
	);
};

export default DrawerNavigator;
