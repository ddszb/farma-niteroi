import styled from 'styled-components/native';
import colors from '../../styles/colors';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;

export const Container = styled.View`
	flex: 1;
	align-items: center;
	justify-content: space-around;
	padding: ${windowWidth * 0.06}px;
`;

export const Text = styled.Text`
	font-size: 26px;
	color: ${colors.grey13};
	text-align: center;
	margin-top: 35px;
	margin-bottom: 35px;
`;
