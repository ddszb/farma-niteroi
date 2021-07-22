import styled from "styled-components/native"

import {ListItem} from 'react-native-elements'

export const LeftTitle = styled(ListItem.Title)`
    font-size: 17px;
    font-weight: bold;
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
    color: #aaa;
    text-align: right;
`
export const RightContainer = styled(ListItem.Content)`
    align-items: flex-end;
    margin-right: 10px;
`
export const MedListView = styled.View`
    flex: 1;
    justify-content: center;
`
export const IconPadding = styled.View`
    padding-left: 10px;
    padding-right: 5px;
`