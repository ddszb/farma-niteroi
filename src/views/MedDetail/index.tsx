import React, {useCallback, useState} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import {ToastAndroid, View, Alert} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import iconMoonConfig from '../../selection.json';
import {cancelNotification} from '../../util/Notifications';
import {
	Container,
	RowView,
	MedName,
	HPadding,
	VPadding,
	InfoTitle,
	InfoText,
	Bottom,
	ButtonView,
	Button,
	StockInput,
	ButtonText,
} from './styles';
import moment from 'moment';
import 'moment/locale/pt-br';
import doseStatus from '../../constants/doseStatus';
import medStatus from '../../constants/medStatus';
import colors from '../../styles/colors';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerNavigatorParamList} from '../../navigation/DrawerNavigator';
import {StorageService} from '../../services';
import Med, {WeekdaysKeys} from '../../Models/Med';

const MedDetail: React.FC = () => {
	const navigation =
		useNavigation<DrawerNavigationProp<DrawerNavigatorParamList>>();
	const {params} = useRoute<RouteProp<DrawerNavigatorParamList, 'MedDetail'>>();
	const {med} = params;
	const [editingStock, setEditingStock] = useState(false);
	const [tempStock, setTempStock] = useState(
		Math.round(med.stock.amount).toString(),
	);
	const MedIcon = createIconSetFromIcoMoon(iconMoonConfig);

	const endTreatment = useCallback(async (): Promise<void> => {
		const medCopy = {...med};
		let dosesIds: string[] = [];
		medCopy.doses.forEach(dose => {
			if (dose.status != doseStatus.TOMADA || !dose.dateTaken) {
				dose.status = doseStatus.ENCERRADA;
				dosesIds.push(dose.id);
			}
		});
		medCopy.status = medStatus.INATIVO;
		cancelNotification(dosesIds);
		const medsString = await StorageService.retrieve('medsList');
		let meds = medsString !== null ? (JSON.parse(medsString) as Med[]) : [];
		meds = meds.map(m => (m.name == medCopy.name ? medCopy : m));
		StorageService.save('medsList', JSON.stringify(meds));
		navigation.goBack();
	}, [navigation, StorageService, cancelNotification]);

	const onPressEndTreatment = useCallback(() => {
		let mensagemConfirmacao = 'Deseja encerrar o tratamento?';
		if (med.doses && med.doses.length > 0) {
			mensagemConfirmacao += ' Todas as doses não tomadas serão removidas.';
		}

		Alert.alert('Encerrar tratamento', mensagemConfirmacao, [
			{
				text: 'Não',
			},
			{
				text: 'Sim',
				onPress() {
					endTreatment();
				},
			},
		]);
	}, [endTreatment]);

	const updateStock = useCallback(async (amount: number) => {
		let updatedMed = {...med};
		updatedMed.stock.amount = amount;

		const medsString = await StorageService.retrieve('medsList');
		var meds = medsString !== null ? (JSON.parse(medsString) as Med[]) : [];
		meds = meds.map(m =>
			m.name == updatedMed.name && m.id == updatedMed.id ? updatedMed : m,
		);
		StorageService.save('medsList', JSON.stringify(meds));
		ToastAndroid.showWithGravityAndOffset(
			'Estoque atualizado!',
			ToastAndroid.SHORT,
			ToastAndroid.BOTTOM,
			0,
			180,
		);
	}, []);

	const confirmStockChange = useCallback((): void => {
		if (+tempStock <= 0) {
			ToastAndroid.showWithGravityAndOffset(
				'Por favor insira um valor acima de zero.',
				ToastAndroid.SHORT,
				ToastAndroid.BOTTOM,
				0,
				180,
			);
			return;
		}
		let stock = tempStock.replace(/^0+/, '');

		setEditingStock(false);
		setTempStock(stock);
		updateStock(parseInt(stock));
	}, [tempStock, updateStock]);

	const cancelStockChange = useCallback(() => {
		setTempStock(med.stock.amount.toString());
		setEditingStock(false);
	}, [med]);

	const getStockElement = (): JSX.Element => {
		let editableStyle = {
			color: colors.primary,
			borderColor: colors.grey8,
			borderRadius: 5,
			borderWidth: 1,
			marginRight: 6,
			textAlign: 'center',
		};
		return (
			<>
				<InfoTitle>Estoque</InfoTitle>
				<RowView>
					<StockInput
						value={tempStock}
						keyboardType="numeric"
						editable={editingStock}
						placeholderTextColor="red"
						maxLength={4}
						textAlign="right"
						style={[editingStock ? editableStyle : {}]}
						onChangeText={(text: string) =>
							setTempStock(text.replace(/[^0-9]/g, ''))
						}
					/>
					<InfoText>{med.stock.unit.label}(s)</InfoText>
					{editingStock ? (
						<RowView>
							<TouchableOpacity onPress={confirmStockChange}>
								<HPadding>
									<Icon
										name="check"
										type="font-awesome"
										size={26}
										color={colors.ok}
									/>
								</HPadding>
							</TouchableOpacity>
							<TouchableOpacity onPress={cancelStockChange}>
								<HPadding>
									<Icon
										name="close"
										type="font-awesome"
										size={26}
										color={colors.alert}
									/>
								</HPadding>
							</TouchableOpacity>
						</RowView>
					) : (
						<TouchableOpacity onPress={() => setEditingStock(true)}>
							<HPadding>
								<Icon
									name="pencil"
									type="material-community"
									size={26}
									color={colors.primary}
								/>
							</HPadding>
						</TouchableOpacity>
					)}
				</RowView>
				{med.stock.unit.liquid && <InfoText>{' aproximadamente'}</InfoText>}
			</>
		);
	};

	const getTimeElement = (): JSX.Element => {
		if (med.status == medStatus.INATIVO) {
			return (
				<>
					<InfoTitle>Tratamento Encerrado</InfoTitle>
				</>
			);
		}
		if (med.scheduledDoses) {
			const untakenDoses = med.doses.filter(
				d => d.status == doseStatus.ADIADA || d.status == doseStatus.NAO_TOMADA,
			).length;
			if (med.totalDays > 0 && untakenDoses > 0) {
				return (
					<>
						<InfoTitle>Duração</InfoTitle>
						<InfoText>
							{untakenDoses} {untakenDoses > 1 ? 'doses ' : 'dose '}
							{untakenDoses > 1 ? 'restantes' : 'restante'}
						</InfoText>
					</>
				);
			} else {
				return (
					<>
						<InfoTitle>Duração</InfoTitle>
						<InfoText>{'Tratamento contínuo'}</InfoText>
					</>
				);
			}
		} else {
			return (
				<>
					<InfoTitle>Duração</InfoTitle>
					<InfoText>{'Tomar quando necessário'}</InfoText>
				</>
			);
		}
	};

	const getDoseHoursElement = (): JSX.Element[] => {
		return med.doseHours.map(d => {
			var time = moment(d.time).format('HH:mm');
			var unitLabel = med.doseUnit.label + (d.amount > 1 ? 's' : '');
			return (
				<RowView key={d.index}>
					<InfoTitle>{time}</InfoTitle>
					<HPadding>
						<InfoText>
							Tomar {d.amount} {unitLabel}
						</InfoText>
					</HPadding>
				</RowView>
			);
		});
	};

	const getFrequencyElement = (): JSX.Element[] => {
		var weekdays = {
			0: 'dom',
			1: 'seg',
			2: 'ter',
			3: 'qua',
			4: 'qui',
			5: 'sex',
			6: 'sab',
		};
		var intakes: string[] = [];
		Object.keys(med.weekdays).forEach(d => {
			let k = parseInt(d) as WeekdaysKeys;
			if (med.weekdays[k] == 1) {
				intakes.push(weekdays[k]);
			}
		});
		return intakes.map(i => {
			return (
				<View key={i}>
					<InfoText>{i} </InfoText>
				</View>
			);
		});
	};

	return (
		<ScrollView keyboardShouldPersistTaps={'handled'}>
			<Container>
				<VPadding>
					<RowView>
						<MedIcon name={med.icon} size={40} color={med.iconColor} />
						<HPadding>
							<MedName style={{color: med.iconColor}}>{med.name}</MedName>
						</HPadding>
					</RowView>
				</VPadding>
				<VPadding>{getTimeElement()}</VPadding>
				<VPadding>{getStockElement()}</VPadding>
				{med.scheduledDoses && med.doseHours && (
					<VPadding>
						<InfoTitle>Horários</InfoTitle>
						{getDoseHoursElement()}
					</VPadding>
				)}
				{med.scheduledDoses && (
					<VPadding>
						<InfoTitle>Frequência</InfoTitle>
						<VPadding>
							<RowView>{getFrequencyElement()}</RowView>
						</VPadding>
					</VPadding>
				)}
				{med.expireDate && (
					<VPadding>
						<InfoTitle>Validade</InfoTitle>
						<VPadding>
							<InfoText>{moment(med.expireDate).format('L')}</InfoText>
						</VPadding>
					</VPadding>
				)}
				{med.notes && (
					<VPadding>
						<InfoTitle>Notas</InfoTitle>
						<VPadding>
							<InfoText>{med.notes}</InfoText>
						</VPadding>
					</VPadding>
				)}
				<Bottom>
					<ButtonView>
						{med.status == medStatus.ATIVO && (
							<TouchableOpacity onPress={onPressEndTreatment}>
								<Button>
									<ButtonText>Encerrar Tratamento</ButtonText>
								</Button>
							</TouchableOpacity>
						)}
					</ButtonView>
				</Bottom>
			</Container>
		</ScrollView>
	);
};

export default MedDetail;
