import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Screens
import Home from '../views/Home';
import ListaMeds from '../views/ListaMeds/MyMeds';
import MedForm from '../views/MedForm/MedForm';
import MedDetail from '../views/MedDetail';
import Search from '../views/Search';
import MedsNiteroi from '../views/MedsNiteroi/MedsNiteroi';
import HealthCenters from '../views/HealthCenters';
import MedNiteroiDetalhe from '../views/MedsNiteroi/MedNiteroiDetalhe';
import NewDoseForm from '../views/DoseForm/NewDoseForm';
import Tutorial from '../views/Tutorial';
import MedList from '../views/MedList';
const Stack = createStackNavigator();

/**
 * Stack Navigator para a tela de Doses (home)
 * @returns StackNavigator
 */
const DosesStackNavigator: React.FC = (): JSX.Element => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				options={{headerShown: false}}
				name="DosesStack"
				component={Home}
			/>
			<Stack.Screen name="AddDose" component={NewDoseForm} />
			<Stack.Screen
				name="Tutorial"
				options={{headerShown: false}}
				component={Tutorial}
			/>
		</Stack.Navigator>
	);
};

/**
 * Stack Navigator para a tela de Medicamentos
 * @returns StackNavigator
 */
const MedStackNavigator: React.FC = (): JSX.Element => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				options={{headerShown: false}}
				name="MyMeds"
				component={MedList}
			/>
			<Stack.Screen name="AddMeds" component={MedForm} />
			<Stack.Screen name="MedDetail" component={MedDetail} />
		</Stack.Navigator>
	);
};

/**
 * Stack Navigator para a tela de Busca
 * @returns StackNavigator
 */
const SearchStackNavigator: React.FC = (): JSX.Element => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				options={{headerShown: false}}
				name="SearchStack"
				component={Search}
			/>
			<Stack.Screen
				options={{headerTitle: 'Medicamento'}}
				name="NiteroiMedDetail"
				component={MedNiteroiDetalhe}
			/>
			<Stack.Screen
				options={{headerTitle: 'Medicamentos da Prefeitura'}}
				name="NiteroiMeds"
				component={MedsNiteroi}
			/>
			<Stack.Screen
				options={{headerTitle: 'Policlínicas'}}
				name="HealthCenters"
				component={HealthCenters}
			/>
			<Stack.Screen name="AddMeds" component={MedForm} />
		</Stack.Navigator>
	);
};

export {DosesStackNavigator, MedStackNavigator, SearchStackNavigator};
