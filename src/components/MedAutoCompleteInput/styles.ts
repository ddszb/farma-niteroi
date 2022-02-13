import styled from 'styled-components/native';
import colors from '../../assets/colors';

export const Container = styled.View`
	flex: 1;
`;

export const Input = styled.TextInput`
	height: 40px;
	border-color: ${colors.grey8};
	color: ${colors.grey4};
	border-radius: 5px;
	border-width: 1px;
	margin-top: 5px;
	padding: 10px;
`;

export const ListContainer = styled.View`
	max-width: 200px;
`;

export const ListItem = styled.TouchableOpacity`
	border-bottom-width: 1px;
	background-color: ${colors.grey13};
	border-color: ${colors.grey12};
	min-height: 30px;
	justify-content: center;
`;

export const MedName = styled.Text`
	color: ${colors.grey4};
	font-size: 14px;
	margin: 5px;
`;
