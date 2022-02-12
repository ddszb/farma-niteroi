import styled from 'styled-components/native';
import colors from '../../assets/colors';

export const Container = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	border-bottom-width: 1px;
	border-color: ${colors.grey13};
`;

export const Title = styled.Text`
	font-size: 22px;
	font-weight: bold;
	text-align: center;
	margin-top: 7px;
	margin-bottom: 7px;
	color: ${colors.primary};
`;

export const LeftButton = styled.TouchableOpacity`
	margin-left: 10px;
`;

export const RightButton = styled.TouchableOpacity`
	margin-right: 10px;
`;

export const RightPadding = styled.TouchableOpacity`
	margin-right: 42px;
`;
