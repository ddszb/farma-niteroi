import React, {useState} from 'react';
import {Filter} from '..';
import {getContext} from '../../hooks/context';

interface FilterProps {
	visible: boolean;
	onChange(): void;
}
const MedsFilter: React.FC<FilterProps> = ({visible, onChange}) => {
	const {medsFilter, saveMedsFilter} = getContext();
	return (
		<Filter
			visible={visible}
			title="Filtrar Medicamentos"
			storageKey="medsFilter"
			onClose={() => onChange()}
			value={medsFilter}
			options={['Mostrar atuais', 'Mostrar todos']}
			onChangeValue={value => {
				saveMedsFilter(value);
				onChange();
			}}
		/>
	);
};

export default MedsFilter;
