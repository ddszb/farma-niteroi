import React, {useState, useCallback} from 'react';
import {View, FlatList, ListRenderItem} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import colors from '../../assets/colors';
import Med from '../../Models/Med';
import {
	Collapsible,
	Container,
	SelectableItem,
	SelectedText,
	Title,
	Text,
} from './styles';

interface PickerProps {
	data: Med[];
	onSelect(med: Med): void;
}

const DropdownPicker: React.FC<PickerProps> = ({data, onSelect}) => {
	const [text, setText] = useState<string>('');
	const [showList, setShowList] = useState<boolean>(false);

	const onPress = useCallback((): void => {
		setShowList(!showList);
	}, [showList]);

	const onSelectMed = useCallback(
		(med: Med): void => {
			setText(med.name);
			setShowList(false);
			onSelect(med);
		},
		[onSelect],
	);

	const renderItem: ListRenderItem<Med> = ({item: med}): JSX.Element => {
		return (
			<SelectableItem onPress={() => onSelectMed(med)}>
				<Text numberOfLines={1}>{med.name}</Text>
			</SelectableItem>
		);
	};

	return (
		<Container>
			{/* todo: utilizar lib Collapsible*/}
			<Collapsible onPress={onPress}>
				<Title>Medicamento</Title>
				<Icon
					name={showList ? 'up' : 'down'}
					type="ant-design"
					size={20}
					color={colors.grey10}
				/>
			</Collapsible>
			{!!text && <SelectedText>{text}</SelectedText>}
			{showList && (
				<FlatList
					data={data}
					renderItem={renderItem}
					keyExtractor={(_, index) => index.toString()}
				/>
			)}
		</Container>
	);
};

export default DropdownPicker;
