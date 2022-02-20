import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button, ButtonText, Container, Text} from './styles';
import Header from '../../components/Header';

interface NavigationProps {}

const Search: React.FC = () => {
	const navigation = useNavigation();
	function navigateToMeds() {
		navigation.navigate('NiteroiMeds', {
			screen: 'AddMeds',
		});
	}

	function navigateToPoli() {
		navigation.navigate('HealthCenters', {screen: 'HealthCenters'});
	}

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
