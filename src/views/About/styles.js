import styled from 'styled-components'
import colors from '../../styles/colors'
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: ${windowWidth * 0.06}px;
`

export const Text = styled.Text`
    font-size: 20px;
    color: ${colors.grey6};
    text-align: center;
`