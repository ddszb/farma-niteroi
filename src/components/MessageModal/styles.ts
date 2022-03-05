import styled from 'styled-components/native';
import colors from '../../assets/colors';

export const ModalBackground = styled.View`
	flex: 1;
	background-color: ${colors.blackOpacity};
`;

export const Container = styled.View`
	background-color: ${colors.secondary};
	top: 40%;
	border-radius: 15px;
	margin: 20px;
	overflow: hidden;
`;

export const Title = styled.Text`
	font-weight: bold;
	font-size: 26px;
	color: ${colors.white};
	text-align: center;
	margin-top: 10px;
	margin-bottom: 10px;
`;

export const Message = styled.Text`
	font-size: 22px;
	color: ${colors.grey12};
	text-align: center;
	margin-top: 30px;
	margin-bottom: 30px;
`;

export const Button = styled.TouchableOpacity`
	flex: 1;
	background-color: ${colors.secondary};
	border-top-width: 1px;
	border-color: ${colors.background};
	justify-content: center;
	align-items: center;
`;

export const ButtonContainer = styled.View`
	flex-direction: row;
	height: 60px;
	background-color: ${colors.accent};
`;

export const ButtonLabel = styled.Text`
	font-size: 22px;
	color: ${colors.accent};
	font-weight: bold;
`;
