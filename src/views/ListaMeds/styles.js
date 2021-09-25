import styled from "styled-components/native"

import {ListItem} from 'react-native-elements'
import colors from "../../styles/colors"

export const HeaderTitle = styled.View`
    flex-direction: row;
    background-color: ${colors.primary}
    justify-content: center;
    align-items: center;
    height: 60px;
`
export const HeaderTitleText = styled.Text`
    font-size: 22px;
    text-align: left;
    color: ${colors.white};
    margin-left: 15px;
    text-align: center;
`
export const LeftTitle = styled(ListItem.Title)`
    font-size: 17px;
    font-weight: bold;
    width: 200px;
`
export const LeftSubtitle = styled(ListItem.Subtitle)`
    fontSize: 16px;
`
export const RightTitle = styled(ListItem.Title)`
    font-size: 18px;
    font-weight: bold;
    text-align: right;
`
export const RightSubtitle = styled(ListItem.Subtitle)`
    font-weight: bold;
    font-size: 16px;
    color: ${colors.grey10};
    text-align: right;
`
export const RightContainer = styled(ListItem.Content)`
    align-items: flex-end;
    margin-right: 10px;
`
export const MedListView = styled.View`
    flex: 1;
`
export const IconPadding = styled.View`
    padding-left: 10px;
    padding-right: 5px;
`

export const ToggleView = styled.View`
    position: absolute;
    right: 16px;
`

export const EmptyListContainer = styled.View`
    margin-top: 100px;
    align-items: center;
`

export const LightText = styled.Text`
    font-size: 18px;
    color: ${colors.grey8};
    margin-horizontal: 5px;
    text-align: left;
    flex-wrap: wrap;
`
export const FooterButton = styled.TouchableOpacity`
    flex: 2;
    margin-vertical: 10px;
    margin-horizontal: 20px;
    background-color:${colors.primary}
    justify-content: center;
    max-height: 52px;
    border-radius: 30px;
`

export const FooterButtonText = styled.Text`
    font-size: 23px;
    font-weight:bold;
    text-align: left;
    color: ${colors.white};
    text-align: center;
`
