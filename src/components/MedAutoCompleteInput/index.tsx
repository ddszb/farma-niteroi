import React, {useState, useCallback} from 'react';
import {FlatList} from 'react-native';
import MedAnvisa from '../../Models/MedAnvisa';
import colors from '../../assets/colors';
import {Container, Input, ListContainer, ListItem, MedName} from './styles';

interface AutoCompleteInputProps {
	editable: boolean;
	placeholder: string;
	value: string;
	onChange(med: MedAnvisa): void;
}
const MedAutoCompleteInput: React.FC<AutoCompleteInputProps> = ({
	editable,
	placeholder,
	value,
	onChange,
}) => {
	const [data, setData] = useState<MedAnvisa[]>([]); // todo usar contexto
	const [text, setText] = useState('');
	const [showList, setShowList] = useState(false);

	const onChangeText = (text: string): void => {
		setText(text);
		if (text.length >= 3) {
			filterMeds(text);
		} else {
			setShowList(false);
		}
	};

	const filterMeds = useCallback((query: string): void => {
		// ! todo Filtrar medicamentos direto do contexto
		setData([]);
	}, []);

	const onSelectMed = useCallback(
		(med: MedAnvisa): void => {
			let newName = getMedDisplayName(med);
			setText(newName);
			setShowList(false);
			onChange(med);
		},
		[onChange],
	);

	const getMedDisplayName = useCallback(
		(med: MedAnvisa): string => {
			let displayName = med.popularName;
			if (med.drug.toLowerCase().startsWith(text)) {
				displayName = med.drug;
			}
			return `${displayName} ${med.concentration}`;
		},
		[text],
	);

	return (
		<Container>
			<Input
				placeholderTextColor={colors.grey6}
				onChangeText={onChangeText}
				editable={editable != null ? editable : true}
				placeholder={placeholder}
				value={value != null ? value : text}
			/>

			{showList && (
				<ListContainer>
					<FlatList
						keyboardShouldPersistTaps={'handled'}
						data={data}
						renderItem={({item: med}) => {
							return (
								<ListItem onPress={() => onSelectMed(med)}>
									<MedName>{getMedDisplayName(med)}</MedName>
								</ListItem>
							);
						}}
						keyExtractor={(item, index) => index.toString()}
					/>
				</ListContainer>
			)}
		</Container>
	);
};

export default MedAutoCompleteInput;
