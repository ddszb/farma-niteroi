import styled from 'styled-components/native';
import colors from '../../styles/colors';
import {Dimensions, PixelRatio} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const PageView = styled.View`
	width: ${windowWidth}px;
	height: ${windowHeight}px;
`;

export const TitleView = styled.View`
	border-bottom-width: 1px;
	border-color: ${colors.grey12};
`;
export const TitleText = styled.Text`
	font-size: 22px;
	font-weight: bold;
	color: ${colors.primary};
	text-align: center;
	padding: 10px;
`;

export const DescriptionView = styled.View`
	flex: 0.3;
	padding: 12px;
`;
export const DescriptionText = styled.Text`
	font-size: 18px;
	color: ${colors.grey6};
	text-align: justify;
	padding: 10px;
`;
export const DescriptionTitle = styled.Text`
	font-size: 22px;
	font-weight: bold;
	text-align: center;
	color: ${colors.primary};
`;

export const ImageView = styled.View`
	align-items: center;
	border-bottom-width: 2px;
	border-color: ${colors.grey12};
`;

export const Image = styled.Image`
	width: 100%;
	height: ${windowHeight * 0.65}px;
`;

export const PaginationView = styled.View`
	position: absolute;
	bottom: 30px;
	left: 0px;
	right: 0px;
	justify-content: center;
	align-items: center;
	flex-direction: row;
`;

export const PaginationDot = styled.View`
	height: 10px;
	width: 10px;
	border-radius: 5px;
	background-color: ${colors.primary};
	margin-left: 10px;
`;

export const Button = styled.View`
	left: ${windowWidth * 0.5 - windowWidth * 0.5 * 0.5}px;
	border-width: 1px;
	border-color: ${colors.grey12};
	border-radius: 6px;
	width: ${windowWidth * 0.5}px;
	height: 40px;
	justify-content: center;
	background-color: ${colors.primary};
`;

export const ButtonText = styled.Text`
	color: ${colors.white};
	font-size: 20px;
	font-weight: bold;
	text-align: center;
`;
