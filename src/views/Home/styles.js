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
    border-bottom-width: 1px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
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
    margin-right: 20px;
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
    font-family: Lato;
`

export const LightText = styled.Text`
    font-size: 18px;
    color: #777;
    margin-horizontal: 5px;
    text-align: center;
`

export const OkText = styled.Text`
    font-size: 23px;
    font-weight: bold;
    color: #40a843;
    text-align:center;
    margin-left: 46px;
    margin-right: 5px;
`

export const WarningText = styled.Text`
    font-size: 23px;
    color: #f03622;
    font-weight: bold;
    margin-horizontal: 5px;
    margin-left: 46px;
    text-align: center;
`

export const WaitingText = styled.Text`
    font-size: 23px;
    color: #777;
    font-weight: bold;
    margin-horizontal: 5px;
    margin-left: 46px;
    text-align: center;
`

export const DateText = styled.Text`
    font-size: 23px;
    margin-horizontal: 10px;
    margin-vertical: 16px;
    color: #63488c;
    font-weight: bold;
    font-family: Lato;
    text-align: center;
`

export const HeaderTitle = styled.View`
    flex-direction: row;
    background-color: #63488c;
    align-items: center;
    justify-content: space-around;
    height: 60px;
`

export const HeaderTitleText = styled.Text`
    font-size: 22px;
    text-align: left;
    color: #FFF;
    margin-left: 105px;
    text-align: center;
`

export const DatePickerView = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

export const ResetDateButton = styled.View`
    position: absolute;
    left: 25px;
    top: -44px;
`

export const EmptyListContainer = styled.View`
    justify-content: flex-end;
    align-items: center;
    margin-top: 100px;
`

export const RightSwipe = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding-horizontal: 20px;
    margin-bottom: 8px;
`

export const RightSwipeText = styled.Text`
    font-weight: bold;
    font-size: 20px;
    margin: 10px;
    color: #FFF;
`

export const HPadding = styled.View`
    padding: 5px;
`

export const VPadding = styled.View`
    padding: 5px;
`

export const RowView = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    
`

export const FooterButton = styled.TouchableOpacity`
    flex: 2;
    background-color:#52ab55;
    justify-content: center;
    max-height: 60px;
`

export const FooterButtonText = styled.Text`
    font-size: 23px;
    font-weight:bold;
    text-align: left;
    color: #FFF;
    text-align: center;
`
