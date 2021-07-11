import styled from 'styled-components'

export const Container = styled.View`
    flex: 1;
`

export const Header = styled.View`
    flex: 2;
`

export const Body = styled.View`
    flex: 8;
`

export const CardBox = styled.View`
    background-color: #eaeaea;
    border-right-color: #bbb;
    border-bottom-color: #bbb;
    border-right-width: 1px;
    border-bottom-width: 1px;
    border-radius: 10px;
    margin-bottom: 8px;
    flex-direction: row;
    margin-horizontal: 4px;
`

export const ColorTag = styled.View`
    flex: 0.2;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
`
export const Detail = styled.View`
    flex: 5.5;
`

export const Buttons = styled.View`
    flex: 3.5;
    flex-direction: row;
    align-items: center;
`

export const TopContent = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    padding: 5px;
`

export const BottomContent = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding-bottom: 5px;
    padding-left: 7px;
`

export const DarkText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #666;
    margin-horizontal: 5px;
`

export const LightText = styled.Text`
    font-size: 18px;
    color: #888;
    margin-horizontal: 5px;
`

export const DateText = styled.Text`
    font-size: 20px;
    margin-horizontal: 10px;
    margin-vertical: 15px;
    color: #63488c;
    font-weight: bold;
    font-family: Lato;
    text-align: center;
`

export const HeaderTitle = styled.View`
    background-color: #63488c;
    justify-content: center;
    height: 60px;
    
`

export const HeaderTitleText = styled.Text`
    font-size: 22px;
    text-align: left;
    color: #FFF;
    margin-left: 15px;
    text-align: center;
`

export const DatePickerView = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

export const ResetDateButton = styled.View`
    position: absolute;
    left: 15px;
    top: 15px;
`

export const EmptyListContainer = styled.View`
    justify-content: flex-end;
    align-items: center;
    margin-top: 100px;
`