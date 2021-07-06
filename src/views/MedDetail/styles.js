import styled from 'styled-components'

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
    color: #555;
    text-align: center;
    `
export const InfoText = styled.Text`
    font-size: 16px;
    color: #888;
    text-align: left;
`
export const InfoTextSmall = styled.Text`
    font-size: 16px;
    color: #888;
`

export const Bottom = styled.View`
    flex: 1;
    justify-content: flex-end;
    align-self: center;
` 
export const ButtonView = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const Button = styled.View`
    border-width: 1px;
    border-color: #ccc;
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

export const LeftButtonText = styled.Text`
    color: #3489eb;
    font-size: 16px;
    text-align: center;
    `
    
export const RightButtonText = styled.Text`
    color: #63488c;
    font-size: 16px;
    text-align: center;
`