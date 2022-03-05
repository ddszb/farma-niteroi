import React, {useState} from 'react';
import {Modal} from 'react-native';
import {SwipeablePanel} from 'rn-swipeable-panel';
import colors from '../../assets/colors';
import {
	Button,
	ButtonContainer,
	ButtonLabel,
	Container,
	Message,
	ModalBackground,
	Title,
} from './styles';

export interface MessageModalProps {
	title: string;
	message: string;
	onConfirm(): void;
	onCancel(): void;
	confirmLabel?: string;
	cancelLabel?: string;
}

const MessageModal: React.FC<MessageModalProps> = ({
	title,
	message,
	confirmLabel,
	cancelLabel,
	onConfirm,
	onCancel,
}) => {
	const [visible, setVisible] = useState(!!message);
	return (
		<Modal
			animationType="slide"
			visible={visible}
			transparent
			statusBarTranslucent>
			<ModalBackground>
				<Container>
					<Title>{title}</Title>
					<Message>{message}</Message>
					<ButtonContainer>
						<Button onPress={onCancel} style={{borderRightWidth: 1}}>
							<ButtonLabel>{cancelLabel || 'Cancelar'}</ButtonLabel>
						</Button>
						<Button onPress={onConfirm}>
							<ButtonLabel>{confirmLabel || 'Ok'}</ButtonLabel>
						</Button>
					</ButtonContainer>
				</Container>
			</ModalBackground>
		</Modal>
	);
};
export default MessageModal;
