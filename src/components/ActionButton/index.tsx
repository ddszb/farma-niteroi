import React from 'react';

import {View, StyleSheet} from 'react-native';
import {OuterText, Button, ButtonText} from './styles';

interface ButtonProps {
	visible: boolean;
	label: string;
	outerText?: string;
	bottom?: boolean;
	onClick(): void;
}

const ActionButton: React.FC<ButtonProps> = ({
	visible,
	label,
	outerText,
	bottom,
	onClick,
}) => {
	return (
		<>
			{visible && (
				<View style={bottom ? styles.bottom : styles.container}>
					{outerText && <OuterText>{outerText}</OuterText>}
					<Button onPress={() => onClick()}>
						<ButtonText>{label}</ButtonText>
					</Button>
				</View>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
	bottom: {
		width: '100%',
		position: 'absolute',
		bottom: 5,
	},
});

export default ActionButton;
