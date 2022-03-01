import styled from 'styled-components/native';
import colors from '../../assets/colors';

export const Container = styled.View`
	flex: 1;
`;

export const Title = styled.Text`
	font-size: 26px;
	color: ${colors.primary};
	font-weight: bold;
	font-family: Lato;
	text-align: center;
`;

export const Subtitle = styled.Text`
	font-size: 20px;
	color: ${colors.accent};
	font-family: OpenSans-SemiBold;
	text-align: center;
	margin: 6px;
`;

export const TipView = styled.View`
	margin: 10px 15px 10px 15px;
`;

export const TipText = styled.Text`
	font-size: 20px;
	color: ${colors.grey12};
	text-align: left;
	font-family: OpenSans-Regular;
	margin: 5px 15px 5px 15px;
`;

export const TipRow = styled.View`
	flex-direction: row;
	align-items: center;
`;

export const TopBackground = styled.View`
	flex: 2;
	border-bottom-width: 2px;
	border-bottom-color: ${colors.grey10};
	justify-content: center;
`;

export const BottomBackground = styled.View`
	flex: 7.5;
`;
