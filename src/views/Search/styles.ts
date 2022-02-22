import styled from 'styled-components/native';
import colors from '../../styles/colors';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;

export const Container = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
	padding: ${windowWidth * 0.06}px;
`;

export const Button = styled.View`
	border-width: 1px;
	border-color: ${colors.grey12};
	border-radius: 6px;
	padding-top: 15px;
	padding-bottom: 15px;
	width: ${windowWidth * 0.7}px;
	justify-content: center;
	margin-top: 20px;
	margin-bottom: 20px;
	background-color: ${colors.primary};
`;

export const ButtonText = styled.Text`
	color: ${colors.white};
	font-size: 20px;
	font-weight: bold;
	text-align: center;
`;

export const Text = styled.Text`
	font-size: 20px;
	color: ${colors.grey6};
	text-align: center;
`;
