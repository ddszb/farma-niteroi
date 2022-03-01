import React, {useCallback, useState} from 'react';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/pt-br';
import {
	DateButton,
	DateFilterContainer,
	DateText,
	ResetDateButton,
} from './styles';
import colors from '../../assets/colors';

interface DateFilterProps {
	date: Date;
	onChangeDate(date: Date): void;
}
/**
 * Componente para filtro de Data na página principal (Doses)
 */
const DateFilter: React.FC<DateFilterProps> = ({date, onChangeDate}) => {
	const [showDatePicker, setShowDatePicker] = useState(false);

	const onChange = useCallback(
		(event: any, date: Date): void => {
			setShowDatePicker(false);
			if (event.type == 'set' && date) {
				onChangeDate(date);
			}
		},
		[onChangeDate],
	);

	const showReset = () => {
		return !moment().isSame(date, 'date');
	};

	const getDateStr = () => {
		let dateString = moment(date).isSame(moment(), 'date')
			? 'Hoje, '
			: moment(date).format('dddd, ');
		dateString += moment(date).format('DD [de] MMMM');
		return dateString;
	};

	return (
		<DateFilterContainer>
			<DateButton
				style={showReset() ? {marginLeft: 30} : {}}
				onPress={() => setShowDatePicker(true)}>
				<DateText>{getDateStr()}</DateText>
			</DateButton>
			{showReset() && (
				<ResetDateButton onPress={() => onChangeDate(new Date())}>
					<Icon
						name="calendar-refresh"
						type="material-community"
						size={30}
						color={colors.accent}
					/>
				</ResetDateButton>
			)}

			{showDatePicker && (
				<DateTimePicker value={date} onChange={onChange} mode="date" />
			)}
		</DateFilterContainer>
	);
};
export default DateFilter;
