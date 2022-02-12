import styled from 'styled-components/native';
import colors from '../../../../assets/colors';

export const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	margin-top: 22px;
	background-color: ${colors.blackOpacity};
`;

export const ButtonContainer = styled.View`
	flex-direction: row;
`;

export const CancelButton = styled.TouchableOpacity`
	flex: 1;
	margin-top: 15px;
	height: 55px;
	padding: 6px;
	background-color: ${colors.grey10};
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

export const ConfirmButton = styled.TouchableOpacity`
	flex: 1;
	margin-top: 15px;
	height: 55px;
	padding: 6px;
	background-color: ${colors.ok};
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

export const RowView = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

export const ButtonText = styled.Text`
	font-size: 18px;
	color: ${colors.white};
	font-weight: bold;
	margin: 5px;
`;

export const InputContainer = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
`;

export const ModalTitle = styled.Text`
	margin: 5px 0px 15px 0px;
	text-align: center;
	font-size: 22px;
	font-weight: bold;
	color: ${colors.primary};
`;

export const TextInput = styled.TextInput`
	height: 40px;
	width: 70px;
	overflow: hidden;
	text-align: center;
	border-color: ${colors.grey8};
	color: ${colors.grey4};
	border-radius: 5px;
	border-width: 1px;
	margin-bottom: 10px;
	margin-top: 5px;
	padding: 10px;
`;

export const UnitText = styled.Text`
	text-align: center;
	margin-bottom: 5px;
	margin-left: 8px;
	font-size: 16px;
	color: ${colors.primary};
`;
