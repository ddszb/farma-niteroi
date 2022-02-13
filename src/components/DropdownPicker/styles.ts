import styled from 'styled-components/native';
import colors from '../../assets/colors';

export const Container = styled.View`
	flex: 1;
`;
export const Title = styled.Text`
	font-size: 26px;
	font-weight: bold;
	color: ${colors.primary};
	margin-right: 7px;
`;

export const Text = styled.Text`
	color: ${colors.grey4};
	font-size: 18px;
	margin: 5px;
	text-align: left;
`;

export const Collapsible = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
	justify-content: center;
	margin-left: 27px;
`;

export const SelectedText = styled.Text`
	font-size: 18px;
	color: ${colors.grey8};
	font-weight: bold;
	text-align: center;
	margin-top: 16px;
	margin-bottom: 16px;
`;

export const SelectableItem = styled.TouchableOpacity`
	border-bottom-width: 1px;
	border-color: ${colors.grey12};
	min-height: 40px;
	justify-content: center;
	align-items: center;
`;
