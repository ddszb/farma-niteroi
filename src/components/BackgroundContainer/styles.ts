import styled from 'styled-components/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../assets/colors';

export const SafeArea = styled(SafeAreaView)`
	flex: 1;
	background-color: ${colors.background};
`;

export const Container = styled.View`
	flex: 1;
	background-color: ${colors.background};
`;
