import React, {useState, useEffect, useCallback} from 'react';
import {
	TouchableOpacity,
	Linking,
	ListRenderItem,
	FlatList,
} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import HealthCenter from '../../Models/HealthCenter';
import HttpService from '../../services/HttpService';
import colors from '../../assets/colors';
import {
	CardBox,
	CardContent,
	Container,
	Name,
	LightText,
	Text,
	Phones,
	VPadding,
	HPadding,
	InfoSide,
	IconSide,
	PhoneNumber,
} from './styles';

const HealthCenters: React.FC = () => {
	const [healthCenters, setHealthCenters] = useState<HealthCenter[]>();

	useEffect(() => {
		const fetchPolis = async () => {
			HttpService.get(`/policlinicas`).then(response => {
				if (response.data) {
					setHealthCenters(response.data);
				}
			});
		};
		fetchPolis();
	}, []);

	const __dialCall = useCallback(
		(phone: string) => {
			var number = phone.replace('-', '');
			Linking.openURL('tel:' + number);
		},
		[Linking],
	);

	const __openMaps = useCallback(
		(healthCenter: HealthCenter): void => {
			const url = `geo:0,0?q=${
				healthCenter.name +
				' - ' +
				healthCenter.address.streetName +
				',' +
				healthCenter.address.neighborhood
			}`;
			Linking.openURL(url);
		},
		[Linking],
	);

	const getPhoneNumberElement = useCallback(
		(healthCenter: HealthCenter): JSX.Element[] => {
			return healthCenter.phoneNumbers.map(p => {
				return (
					<TouchableOpacity key={p} onPress={() => __dialCall(p)}>
						<HPadding>
							<PhoneNumber>{p}</PhoneNumber>
						</HPadding>
					</TouchableOpacity>
				);
			});
		},
		[],
	);

	const getHealthCenterElement: ListRenderItem<HealthCenter> = ({
		item: healthCenter,
	}) => {
		let street = `${healthCenter.address.streetName}${
			healthCenter.address.number ? ', ' + healthCenter.address.number : ''
		}`;
		return (
			<CardBox>
				<CardContent>
					<InfoSide>
						<Name>{healthCenter.name}</Name>
						<LightText>{street}</LightText>
						<Text>{healthCenter.address.neighborhood}</Text>
						<VPadding>
							<Text>Tel.:</Text>
							<Phones>{getPhoneNumberElement(healthCenter)}</Phones>
						</VPadding>
					</InfoSide>
					<IconSide>
						<TouchableOpacity onPress={() => __openMaps(healthCenter)}>
							<Icon name="map" type="entype" size={50} color={colors.primary} />
							<Text style={{textAlign: 'center'}}>Ver no mapa</Text>
						</TouchableOpacity>
					</IconSide>
				</CardContent>
			</CardBox>
		);
	};

	return (
		<Container>
			<FlatList
				keyExtractor={user => user.id.toString()}
				data={healthCenters}
				renderItem={getHealthCenterElement}
			/>
		</Container>
	);
};

export default HealthCenters;
