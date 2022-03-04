import React from 'react';
import {Filter} from '..';
import {getContext} from '../../hooks/context';

interface FilterProps {
	visible: boolean;
	onChange(): void;
}
const DosesFilter: React.FC<FilterProps> = ({visible, onChange}) => {
	const {dosesFilter, saveDosesFilter} = getContext();

	return (
		<Filter
			visible={visible}
			title="Filtrar Doses"
			storageKey="homeFilter"
			onClose={() => onChange()}
			value={dosesFilter}
			options={['Todas as doses', 'Apenas não tomadas', 'Apenas tomadas']}
			onChangeValue={value => {
				saveDosesFilter(value);
				onChange();
			}}
		/>
	);
};

export default DosesFilter;
