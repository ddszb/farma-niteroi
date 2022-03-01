import React, {useState} from 'react';
import {Filter} from '..';

interface FilterProps {
	visible: boolean;
	onChange(value: string): void;
}
const DosesFilter: React.FC<FilterProps> = ({visible, onChange}) => {
	const [filterOption, setFilterOption] = useState('0');

	return (
		<Filter
			visible={visible}
			title="Filtrar Doses"
			storageKey="homeFilter"
			onClose={() => onChange(filterOption)}
			value={filterOption}
			options={['Todas as doses', 'Apenas não tomadas', 'Apenas tomadas']}
			onChangeValue={value => {
				setFilterOption(value);
				onChange(value);
			}}
		/>
	);
};

export default DosesFilter;
