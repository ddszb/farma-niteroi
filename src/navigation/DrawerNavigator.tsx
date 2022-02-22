import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

//Navigator
import DrawerMenu from './DrawerMenu';
import TabNavigator from './TabNavigator';
import Tutorial from '../views/Tutorial';
import About from '../views/About/About';
import colors from '../styles/colors';
import MedNiteroiDetalhe from '../views/MedsNiteroi/MedNiteroiDetalhe';
import MedsNiteroi from '../views/MedsNiteroi/MedsNiteroi';
import Search from '../views/Search';
import Policlinicas from '../views/Policlinicas/Policlinicas';

const Drawer = createDrawerNavigator();

export type DrawerNavigatorParamList = {
	DosesDrawer: undefined;
	Tutorial: {hideWelcome?: boolean};
	About: undefined;
	Doses: undefined;
	MedsList: undefined;
	NiteroiMeds: undefined;
	HealthCenters: undefined;
	Search: undefined;
	Info: undefined;
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
			initialRouteName="Drawer">
			<Drawer.Screen
				name="Drawer"
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
				name="Policlinicas"
				component={Policlinicas}
			/>
		</Drawer.Navigator>
	);
};

export default DrawerNavigator;
