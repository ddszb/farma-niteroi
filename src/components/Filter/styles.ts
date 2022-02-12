import styled from 'styled-components/native';
import colors from '../../assets/colors';

export const Container = styled.View`
	flex: 1;
`;

export const Title = styled.Text`
	font-weight: bold;
	font-size: 26;
	color: ${colors.primary};
	text-align: center;
	margin-top: 10px;
	margin-bottom: 10px;
`;

export const OptionText = styled.Text`
	font-size: 22px;
	color: ${colors.grey6};
`;

export const Button = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
	height: 50px;
	margin-left: 12px;
`;
