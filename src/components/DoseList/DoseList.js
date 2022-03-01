import React from 'react';

//Libs
import {FlatList, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import iconMoonConfig from '../../selection.json';
import moment from 'moment';
import 'moment/locale/pt-br';
import doseStatus from '../../constants/doseStatus';
import {
	Body,
	BottomContent,
	Buttons,
	CardBox,
	ColorTag,
	DarkText,
	Detail,
	DoseHourText,
	EmptyListContainer,
	HourView,
	HPadding,
	LightText,
	OkText,
	RowView,
	TopContent,
	WaitingText,
	WarningText,
} from '../../views/Home/styles';
import colors from '../../styles/colors';

export default props => {
	const MedIcon = createIconSetFromIcoMoon(iconMoonConfig);

	const getStatusRender = dose => {
		var now = moment();
		if (dose.status == doseStatus.CANCELADA) {
			return <LightText> Cancelada </LightText>;
		}
		if (dose.status == doseStatus.NAO_TOMADA) {
			if (moment(dose.date).isBefore(now, 'minute')) {
				return (
					<RowView>
						<WarningText>{moment(dose.date).format('HH:mm')}</WarningText>
						<Icon
							name="warning"
							type={'font-awesome'}
							size={24}
							color={colors.alert}
						/>
					</RowView>
				);
			} else {
				return (
					<RowView>
						<WaitingText>{moment(dose.date).format('HH:mm')}</WaitingText>
						<Icon
							name="clock-o"
							type="font-awesome"
							size={24}
							color={colors.grey6}
						/>
					</RowView>
				);
			}
		}
		if (dose.status == doseStatus.TOMADA) {
			return (
				<RowView>
					<HourView>
						{dose.date && (
							<DoseHourText>{moment(dose.date).format('HH:mm')}</DoseHourText>
						)}
						<OkText>{moment(dose.dateTaken).format('HH:mm')}</OkText>
					</HourView>
					<Icon
						name="check-circle"
						type={'font-awesome'}
						size={24}
						color={colors.ok}
					/>
				</RowView>
			);
		}
	};

	const getDoseItem = ({item: dose}) => {
		var statusRender = getStatusRender(dose);

		return (
			<>
				<TouchableOpacity
					activeOpacity={0.3}
					onPress={() => props.onPressDose(dose)}>
					<CardBox>
						<ColorTag style={{backgroundColor: dose.iconColor}} />
						<Detail>
							<TopContent>
								<MedIcon name={dose.icon} size={24} color={dose.iconColor} />
								<DarkText numberOfLines={1}>{dose.medName}</DarkText>
							</TopContent>
							<BottomContent>
								<LightText>
									{dose.amount} {dose.unit.label}
									{dose.amount > 1 && dose.unit.label != 'Ml' ? 's' : ''}
								</LightText>
							</BottomContent>
						</Detail>
						<Buttons>{statusRender}</Buttons>
					</CardBox>
				</TouchableOpacity>
			</>
		);
	};

	return (
		<Body>
			{props.visibleDoses && props.visibleDoses.length > 0 ? (
				<FlatList
					data={props.visibleDoses}
					keyExtractor={(_, index) => `${index}`}
					renderItem={getDoseItem}
				/>
			) : (
				<EmptyListContainer>
					<Icon
						name="calendar-check-o"
						type="font-awesome"
						size={50}
						color={colors.grey10}
					/>
					<LightText>Nenhuma dose para a data selecionada!</LightText>
				</EmptyListContainer>
			)}
		</Body>
	);
};
