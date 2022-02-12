import styled from 'styled-components/native';
import colors from '../../assets/colors';

export const Button = styled.TouchableOpacity`
	flex: 2;
	min-height: 55px;
	margin-top: 5px;
	border-radius: 6px;
	margin-left: 20px;
	margin-right: 20px;
	justify-content: center;
	background-color: ${colors.primary};
`;

export const ButtonText = styled.Text`
	font-size: 23px;
	font-weight: bold;
	text-align: center;
	color: ${colors.white};
`;

export const OuterText = styled.Text`
	font-size: 17px;
	color: ${colors.grey6};
	text-align: center;
	padding-bottom: 10px;
`;
