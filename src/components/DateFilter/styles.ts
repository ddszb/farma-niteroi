import styled from 'styled-components/native';
import colors from '../../assets/colors';

export const DateText = styled.Text`
	font-size: 22px;
	color: ${colors.white};
	font-weight: bold;
	font-family: Lato;
	text-align: center;
	margin-top: 10px;
	margin-bottom: 10px;
`;

export const DateFilterContainer = styled.View`
	flex: 1;
	margin-top: 10px;
	align-items: flex-start;
	justify-content: center;
	flex-direction: row;
`;

export const ResetDateButton = styled.TouchableOpacity`
	align-items: center;
	font-style: italic;
	margin-top: 8px;
	margin-left: 10px;
`;

export const DateButton = styled.TouchableOpacity`
	border-radius: 5px;
	background-color: ${colors.secondary};
	justify-content: center;
	width: 70%;
`;
