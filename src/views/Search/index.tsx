import React, {useCallback} from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button, ButtonText, Container, Text} from './styles';
import Header from '../../components/Header';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerNavigatorParamList} from '../../navigation/DrawerNavigator';

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
		<>
			<Header title="Procurar" onPressLeft={() => navigation.toggleDrawer()} />
			<Container>
				<Text>
					Veja a relação de medicamentos oferecidos gratuitamente pela
					Prefeitura de Niterói
				</Text>
				<TouchableOpacity onPress={navigateToMeds}>
					<Button>
						<ButtonText> Medicamentos</ButtonText>
					</Button>
				</TouchableOpacity>
				<Text>
					Veja a relação de policlínicas que oferecem medicamentos gratuitamente
				</Text>
				<TouchableOpacity onPress={navigateToPoli}>
					<Button>
						<ButtonText> Policlínicas</ButtonText>
					</Button>
				</TouchableOpacity>
			</Container>
		</>
	);
};

export default Search;
