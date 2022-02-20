import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, ToastAndroid, TouchableOpacity} from 'react-native';
import doseStatus from '../../../constants/doseStatus';
import storageKeys from '../../../constants/storageKeys';
import {Button, ButtonText} from '../styles';
import * as UtilitarioFormatacao from '../../../util/UtilitarioFormatacao';
import {scheduleDoseNotification} from '../../../util/Notifications';
import {generateId} from '../../../util/UtilitarioCalculo';

export default props => {
	const __createDayDoses = (
		medPersist,
		doses,
		day,
		currentTime,
		totalIntakes,
	) => {
		medPersist.doseHours.forEach(doseTime => {
			day.setHours(doseTime.time.getHours(), doseTime.time.getMinutes());
			if (day > currentTime && doses.length < totalIntakes) {
				let doseId = generateId();
				var doseDate = new Date(day);
				doseDate.setSeconds(0);
				let dose = {
					medName: medPersist.name,
					medId: medPersist.id,
					date: doseDate,
					unit: doseTime.unit,
					amount: doseTime.amount,
					dateTaken: null,
					newDate: null,
					status: doseStatus.NAO_TOMADA,
					icon: medPersist.icon,
					iconColor: medPersist.iconColor,
					index: doses.length,
					id: doseId,
					sporadic: false,
				};
				scheduleDoseNotification(dose);
				doses.push(dose);
			}
		});
	};

	const __createDosesList = medPersist => {
		if (!medPersist.scheduledDoses || medPersist.totalDays == 0) {
			medPersist.doses = [];
		} else {
			var doseDay = new Date(medPersist.startDate);
			var currentTime = new Date();
			var totalIntakes = medPersist.totalDays * medPersist.doseHours.length;
			var daysArray = Object.keys(medPersist.weekdays).map(
				d => medPersist.weekdays[d],
			);
			var doses = [];
			while (doses.length < totalIntakes) {
				if (daysArray[doseDay.getDay()] == 1) {
					__createDayDoses(
						medPersist,
						doses,
						doseDay,
						currentTime,
						totalIntakes,
					);
				}
				doseDay.setDate(doseDay.getDate() + 1);
			}
			medPersist.doses = doses;
		}
	};

	const __fillMedInfo = medPersist => {
		medPersist.scheduledDoses = !!props.med.scheduledDoses;
		medPersist.icon = medPersist.icon ? medPersist.icon : medicons[0];
		medPersist.iconColor = medPersist.iconColor
			? medPersist.iconColor
			: iconColors[0];

		if (medPersist.expireDate) {
			medPersist.expireDate = UtilitarioFormatacao.parseDate(
				medPersist.expireDate,
			);
		}
		if (medPersist.startDate) {
			medPersist.startDate = UtilitarioFormatacao.parseDate(
				medPersist.startDate,
			);
			__createDosesList(medPersist);
		}
		return medPersist;
	};

	const saveMed = async () => {
		var medPersist = {...props.med};
		medPersist.id = generateId();
		medPersist = __fillMedInfo(medPersist);
		const medsString = await AsyncStorage.getItem(storageKeys.MEDS);
		const meds = medsString !== null ? JSON.parse(medsString) : [];

		meds.push(medPersist);
		AsyncStorage.setItem(storageKeys.MEDS, JSON.stringify(meds));

		props.navigation.reset({
			index: 0,
			routes: [{name: 'Medicamentos'}],
		});
	};

	const validateMed = async () => {
		var invalid = false;
		var errors = [];

		if (!props.med.stock.amount || props.med.stock.amount <= 0) {
			invalid = true;
			errors.push('Por favor informe o estoque da medicação atual');
		}
		if (invalid) {
			ToastAndroid.showWithGravityAndOffset(
				errors[0],
				ToastAndroid.SHORT,
				ToastAndroid.BOTTOM,
				0,
				90,
			);
			return false;
		}
		return true;
	};

	const onPress = async () => {
		var isValid = await validateMed();
		if (!isValid) {
			return;
		}
		Alert.alert('AddMeds', 'Deseja adicionar o medicamento?', [
			{
				text: 'Não',
			},
			{
				text: 'Sim',
				onPress() {
					saveMed();
				},
			},
		]);
	};
	return (
		<TouchableOpacity onPress={onPress}>
			<Button>
				<ButtonText>Salvar</ButtonText>
			</Button>
		</TouchableOpacity>
	);
};
