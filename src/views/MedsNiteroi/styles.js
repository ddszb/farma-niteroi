import styled from 'styled-components'
import colors from '../../styles/colors'

export const Container = styled.View`
    flex: 1;
    padding: 12px;
`

export const ItemBox = styled.View`
    flex-direction: row;
    border-bottom-width: 1px;
    border-bottom-color: ${colors.grey13};
    justify-content: space-between;
    padding: 10px;
`
export const TextView = styled.View`
    flex-direction: column;
    max-width: 200px;
    justify-content: center;
`


export const MedName = styled.Text`
    color: ${colors.primary};
    font-weight: bold;
    text-align: left;
`

export const MedDosage = styled.Text`
    color: ${colors.primary};
    text-align: left;
`
export const SearchBox = styled.TextInput`
    height: 40px;
    border-color: ${colors.grey8};
    color: ${colors.grey4};
    border-radius: 5px;
    border-width: 1px;
    margin-bottom: 10px;
    margin-top: 5px;
    padding: 10px;
`

export const Description = styled.Text`
    color: ${colors.grey6};
    font-size: 16px;
    text-align: center;
    padding-bottom: 12px;
    padding-top: 12px;
`

export const RowView = styled.View`
    flex-direction: row;
    align-items: center;

`

export const MedNameTitle = styled.Text`
    font-size: 22px;
    font-weight: bold;
    text-align: center;
    color: ${colors.primary};
`

export const InfoText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    color: ${colors.grey6};
    padding: 8px;
`
export const DetailContainer = styled.View`
    flex: 1;
    padding: 12px;
    align-items: center;
`