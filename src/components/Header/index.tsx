import React from 'react';
import colors from '../../assets/colors';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {
	Container,
	LeftButton,
	RightButton,
	RightPadding,
	Title,
} from './styles';

interface HeaderProps {
	title: string;
	leftButton: string;
	onPressLeft(): void;
	rightButton?: string;
	onPressRight?(): void;
}
const Header: React.FC<HeaderProps> = ({
	title,
	leftButton,
	onPressLeft,
	rightButton,
	onPressRight,
}) => {
	return (
		<Container>
			<LeftButton onPress={onPressLeft}>
				<Icon name={leftButton} type="entypo" color={colors.white} size={32} />
			</LeftButton>
			<Title>{title}</Title>
			{rightButton ? (
				<RightButton style={{marginRight: 10}} onPress={onPressRight}>
					<Icon
						name={rightButton}
						type="material-community"
						color={colors.white}
						size={32}
					/>
				</RightButton>
			) : (
				<RightPadding />
			)}
		</Container>
	);
};

export default Header;
