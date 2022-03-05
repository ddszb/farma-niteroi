import React, {useCallback} from 'react';
import {Keyboard, KeyboardTypeOptions} from 'react-native';
import colors from '../../assets/colors';
import {TextInput} from './styles';

interface MainInputProps {
	value: string;
	placeholder?: string;
	keyboardType?: KeyboardTypeOptions;
	onChange(text: string): void;
	onSubmit?(): void;
}
const MainInput: React.FC<MainInputProps> = ({
	value,
	placeholder,
	keyboardType,
	onChange,
	onSubmit,
}) => {
	const onSubmitEditing = useCallback(() => {
		Keyboard.dismiss();
		if (onSubmit) {
			onSubmit();
		}
	}, []);

	return (
		<TextInput
			placeholderTextColor={colors.grey6}
			placeholder={placeholder}
			keyboardType={keyboardType}
			value={value}
			onSubmitEditing={onSubmitEditing}
			onChangeText={onChange}></TextInput>
	);
};

export default MainInput;
