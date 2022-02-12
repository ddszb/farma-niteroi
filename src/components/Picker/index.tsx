import React, {useCallback, useState} from 'react';
import {TextStyle} from 'react-native';
import colors from '../../assets/colors';
import {Picker as Spinner} from '@react-native-picker/picker';

export type PickerItem = {
	label: string;
	value: string;
	key: string;
};
interface PickerProps {
	items: PickerItem[];
	onChangeValue(item: PickerItem): void;
	styles?: TextStyle;
}

const defaultStyles: TextStyle = {
	height: 40,
	color: colors.primary,
	textAlign: 'right',
	fontSize: 30,
};

const Picker: React.FC<PickerProps> = ({items, onChangeValue, styles}) => {
	const [selectedValue, setSelectedValue] = useState(items[0].value);

	const getList = (): JSX.Element[] => {
		return items.map(i => {
			return <Spinner.Item label={i.label} value={i.value} key={i.key} />;
		});
	};

	const onValueChange = useCallback(
		(value: string, _): void => {
			var item = items.find(i => i.value === value);
			if (item) {
				setSelectedValue(value);
				onChangeValue(item);
			}
		},
		[items, onChangeValue],
	);

	return (
		<Spinner
			selectedValue={selectedValue}
			style={[defaultStyles, styles || {}]}
			mode="dialog"
			onValueChange={onValueChange}>
			{getList()}
		</Spinner>
	);
};

export default Picker;
