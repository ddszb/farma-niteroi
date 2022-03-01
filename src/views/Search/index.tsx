import React, {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Container, Text} from './styles';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerNavigatorParamList} from '../../navigation/DrawerNavigator';
import {ActionButton, BackgroundContainer} from '../../components';

const Search: React.FC = () => {
	const navigation =
		useNavigation<DrawerNavigationProp<DrawerNavigatorParamList>>();

	const navigateToMeds = useCallback((): void => {
		navigation.navigate('NiteroiMeds');
	}, [navigation]);

	const navigateToPoli = useCallback((): void => {
		navigation.navigate('HealthCenters');
	}, [navigation]);

	return (
		<BackgroundContainer header title="Procurar">
			<Container>
				<Text>
					Veja a relação de medicamentos oferecidos gratuitamente pela
					Prefeitura de Niterói e em quais policlínicas encontrar
				</Text>
				<ActionButton visible label="Medicamentos" onClick={navigateToMeds} />
				<ActionButton visible label="Policlínicas" onClick={navigateToPoli} />
			</Container>
		</BackgroundContainer>
	);
};

export default Search;
