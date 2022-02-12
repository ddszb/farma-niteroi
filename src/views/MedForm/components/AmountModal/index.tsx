import React, {useCallback, useState} from 'react';
import {Modal, View, StyleSheet, Dimensions} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import colors from '../../../../assets/colors';
import {
	ButtonContainer,
	ButtonText,
	CancelButton,
	ConfirmButton,
	Container,
	InputContainer,
	ModalTitle,
	TextInput,
	UnitText,
} from './styles';

const windowWidth = Dimensions.get('window').width;

interface InputModalProps {
	visible: boolean;
	title: string;
	inputText: string;
	initialValue: string;
	onSet(value: number): void;
	close(): void;
}

const AmountModal: React.FC<InputModalProps> = ({
	visible,
	title,
	initialValue,
	inputText,
	onSet,
	close,
}) => {
	const [value, setValue] = useState<string>(initialValue);

	const onChangeText = useCallback(
		(text: string): void => {
			var text = text.replace(/[^0-9]/g, '');
			setValue(text);
		},
		[value],
	);

	const onConfirm = useCallback((): void => {
		let valueInt = parseInt(value);
		setValue('');
		onSet(valueInt);
	}, [value, onSet]);

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={visible}
			onRequestClose={() => {
				close();
			}}>
			<Container>
				<View style={styles.modalView}>
					<ModalTitle>{title}</ModalTitle>
					<InputContainer>
						<TextInput
							onChangeText={onChangeText}
							value={value}
							maxLength={4}
							keyboardType="numeric"
						/>
						<UnitText>{inputText}</UnitText>
					</InputContainer>
					<ButtonContainer>
						<CancelButton activeOpacity={0.7} onPress={close}>
							<ButtonText>Cancelar</ButtonText>
							<Icon
								name="cancel"
								type="material-icons"
								size={20}
								color={colors.white}
							/>
						</CancelButton>
						<ConfirmButton activeOpacity={0.7} onPress={onConfirm}>
							<ButtonText>Confirmar</ButtonText>
							<Icon
								name="check-circle"
								type="font-awesome"
								size={20}
								color={colors.white}
							/>
						</ConfirmButton>
					</ButtonContainer>
				</View>
			</Container>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalView: {
		width: windowWidth * 0.7,
		backgroundColor: 'white',
		borderRadius: 5,
		alignItems: 'center',
		shadowColor: colors.black,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
});

export default AmountModal;
