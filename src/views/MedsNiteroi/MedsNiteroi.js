import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native';
import HttpService from '../../services/HttpService';
import {
	Container,
	ItemBox,
	MedName,
	MedDosage,
	TextView,
	SearchBox,
	Description,
} from './styles';
export default props => {
	const [medsNiteroi, setMedsNiteroi] = useState([]);
	const [textFilter, setTextFilter] = useState('');

	useEffect(() => {
		const fetchMeds = async () => {
			HttpService.get(`/medicamentos/niteroi`).then(response => {
				console.log(JSON.stringify(response, 0, 2));
				if (response.data) {
					setMedsNiteroi(response.data);
				}
			});
		};
		fetchMeds();
	}, []);

	const descriptionText = `   Essa é a relação de medicamentos oferecidos pela prefeitura de niterói atualmente.
    Clique em um medicamento para ver mais opções`;

	const __navigateToOptions = med => {
		props.navigation.navigate('Medicamento Niteroi Detalhe', {
			screen: 'Medicamento Niteroi Detalhe',
			med: med,
		});
	};

	const __filterMeds = text => {
		const newList = medsNiteroi.filter(med => {
			const textData = text.toUpperCase();
			const medData = med.nome.toUpperCase();
			return medData.indexOf(textData) > -1;
		});
		setMedsNiteroi(newList);
		setTextFilter(text);
	};
	const __getMedItem = ({item: med}) => {
		return (
			<TouchableOpacity onPress={() => __navigateToOptions(med)}>
				<ItemBox>
					<TextView>
						<MedName>{med.farmaco}</MedName>
					</TextView>
					<TextView>
						<MedDosage> {med.concentracao}</MedDosage>
					</TextView>
				</ItemBox>
			</TouchableOpacity>
		);
	};

	return (
		<Container>
			{medsNiteroi && medsNiteroi.length > 0 && (
				<>
					<Description>{descriptionText}</Description>
					<SearchBox
						onChangeText={text => __filterMeds(text)}
						placeholder="buscar por nome"
						value={textFilter}
					/>
					<FlatList
						keyExtractor={med => med.codigoStok.toString()}
						data={medsNiteroi}
						renderItem={__getMedItem}
					/>
				</>
			)}
		</Container>
	);
};
