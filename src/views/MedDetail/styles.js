import styled from 'styled-components'
import colors from '../../styles/colors'

export const Container = styled.View`
    flex: 1;
    padding: 12px;
    align-items: center;
`

export const RowView = styled.View`
    flex-direction: row;
    align-items: center;

`

export const MedName = styled.Text`
    font-size: 26px;
    font-weight: bold;
`
export const VPadding = styled.View`
    padding-top: 10px;
    padding-bottom: 10px;
    max-width: 320px;
`

export const HPadding = styled.View`
    padding-left: 10px;
    padding-right: 10px;
`

export const InfoTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: ${colors.grey4};
    text-align: center;
    `
export const InfoText = styled.Text`
    font-size: 16px;
    color: ${colors.grey8};
    text-align: left;
`
export const InfoTextSmall = styled.Text`
    font-size: 16px;
    color: ${colors.grey8};
`

export const Bottom = styled.View`
    flex: 1;
    justify-content: flex-end;
    align-self: center;
    margin-bottom: 10px;
` 
export const ButtonView = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 10px;
`

export const Button = styled.View`
    border-width: 1px;
    border-color: ${colors.grey12};
    border-radius: 25px;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 5px;
    padding-bottom: 5px;
    max-width: 190px;
    justify-content: center;
    margin-left: 10px;
    margin-right: 10px;
`
export const ButtonPurpleText = styled.Text`
    color: ${colors.primary};
    font-size: 16px;
    text-align: center;
`

export const StockInput = styled.TextInput`
    height: 45px;
    width: 60px;
    overflow: hidden;
    text-align: right;
    font-size: 20px;
    margin-top: 2px;
    margin-right: 6px;
    color: ${colors.grey10};
`