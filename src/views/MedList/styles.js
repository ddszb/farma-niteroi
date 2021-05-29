import styled from "styled-components/native"

import {ListItem} from 'react-native-elements'

export const LeftTitle = styled(ListItem.Title)`
    color: #721dab;
    font-size: 20px;
    font-weight: bold;
`
export const LeftSubtitle = styled(ListItem.Subtitle)`
    fontSize: 16px;
`
export const RightTitle = styled(ListItem.Title)`
    font-size: 18px;
    font-weight: bold;
`
export const RightSubtitle = styled(ListItem.Subtitle)`
    font-weight: bold;
    fontSize: 16px;
    color: #aaa;
`
export const RightContainer = styled(ListItem.Content)`
    align-items: flex-end;
    margin-right: 10px;
`
export const MedListView = styled.View`
    flex: 1;
    justify-content: center;
`

