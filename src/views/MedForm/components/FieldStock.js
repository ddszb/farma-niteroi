import React from 'react';

import Picker from '../../../components/Picker';
import {
	CardBox,
	CardContent,
	FormFieldLabel,
	FormInputAsLabel,
	ViewFlexRow,
} from '../styles';
import doseUnits from '../../../constants/doseUnits';
import colors from '../../../styles/colors';

/**
 * Componente para campo de "estoque" do cadastro de medicamento
 */
export default props => {
	const medUnits = doseUnits.filter(u => !u.doseOnly);
	const liquidDoseUnits = doseUnits.filter(u => u.liquid);

	/**
	 * Mantém o valor de quantidade de estoque com apenas caracteres numéricos.
	 * @param {String} amount A quantidade de estoque inserida
	 */
	const onChangeAmount = amount => {
		amount = amount.replace(/[^0-9]/g, '');
		props.onChangeAmount(amount);
	};

	const inputProps = {
		onChangeText: onChangeAmount,
		placeholder: '0',
		placeholderTextColor: colors.grey6,
		value: props.med.stock.amount,
		keyboardType: 'numeric',
		maxLength: 4,
	};

	const unitProps = {
		items: medUnits,
		value: props.med.stock.unit,
		styles: {width: '85%'},
		onChangeValue: props.onChangeUnit,
	};

	const doseUnitProps = {
		items: liquidDoseUnits,
		onChangeValue: props.onChangeUnit,
	};

	return (
		<>
			<CardBox>
				<CardContent>
					<FormFieldLabel>Meu estoque</FormFieldLabel>
					<ViewFlexRow>
						<FormInputAsLabel {...inputProps} />
						<Picker {...unitProps} />
					</ViewFlexRow>
				</CardContent>
			</CardBox>
			{props.med.doseUnit.liquid && (
				<CardBox>
					<CardContent>
						<FormFieldLabel>Tipo da dose</FormFieldLabel>
						<Picker {...doseUnitProps} />
					</CardContent>
				</CardBox>
			)}
		</>
	);
};
