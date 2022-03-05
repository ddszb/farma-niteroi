import styled from 'styled-components/native';
import colors from '../../assets/colors';

export const Container = styled.View`
	background-color: ${colors.primary};
	border-radius: 8px;
	margin: 15px;
	padding: 15px;
`;

export const Title = styled.Text`
	font-size: 20px;
	color: ${colors.accent};
	font-weight: bold;
	margin-bottom: 10px;
`;
