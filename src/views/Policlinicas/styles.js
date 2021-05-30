import styled from 'styled-components'

export const Container = styled.View`
    flex: 1;
    padding: 8px;
`

export const CardBox = styled.View`
    background-color: #eaeaea;
    border-right-color: #bbb;
    border-bottom-color: #bbb;
    border-right-width: 1px;
    border-bottom-width: 1px;
    border-radius: 5px;
    margin-bottom: 12px;
`
export const CardContent = styled.View`
    padding: 15px;
    flex-direction: row;
`
export const Name = styled.Text`
    color: #63488c;
    font-weight: bold;
    font-size: 16px;
`

export const LightText = styled.Text`
    color: #888;
    font-size: 16px;
    text-align: left;
`
export const Text = styled.Text`
    color: #888;
    font-weight: bold;
    font-size: 16px;
    text-align: left;
`
export const PhoneNumber = styled.Text`
    color: #63488c;
    font-size: 16px;
    text-align: left;
`

export const Phones = styled.View`
    flex-direction: row;
    max-width: 280px;
    flex-wrap: wrap;
`

export const VPadding = styled.View`
    padding-top: 10px;
    padding-bottom: 10px;
`
export const HPadding = styled.View`
    padding-left: 5px;
    padding-right: 5px;
`
export const InfoSide = styled.View`
    flex:5;
`
export const IconSide = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;

`
