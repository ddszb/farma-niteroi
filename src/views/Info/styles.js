import styled from 'styled-components'
import colors from '../../styles/colors'

export const Container = styled.View`
    flex: 1;
`

export const Title = styled.Text`
    font-size: 26px;
    color: ${colors.primary};
    font-weight: bold;
    font-family: Lato;
    text-align: center;
    margin-vertical: 15px;
`

export const Subtitle = styled.Text`
    font-size: 16px;
    color: ${colors.primary};
    font-family: OpenSans-SemiBold
    text-align: center;
    margin: 6px;
`

export const TipView = styled.View`
    margin-horizontal: 15px;
    margin-vertical: 10px;
`

export const TipText = styled.Text`
    font-size: 16px;
    color: ${colors.grey4};
    text-align: left;
    font-family: OpenSans-Regular;
    margin-horizontal: 10px;
    
`

export const TipRow = styled.View`
    flex-direction: row;
    align-items: center;
`

export const TopBackground = styled.View`
    flex: 2;
    background-color: ${colors.grey13b};    
    border-bottom-width: 2px;
    border-bottom-color: ${colors.grey10};
    justify-content: center;
`

export const BottomBackground = styled.View`
    flex: 7.5;
    background-color: ${colors.grey14};  
`