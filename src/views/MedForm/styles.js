import styled from "styled-components/native"

export const FormFieldLabel = styled.Text`
    color: #6f11fd;
    font-weight: bold;
`
export const FormInputTextField = styled.TextInput`
    height: 40px;
    border-color: gray;
    color: #444;
    border-radius: 5px;
    border-width: 1px;
    margin-bottom: 10px;
    margin-top: 5px;
    padding: 10px;
`
export const FormFieldLabelLight = styled.Text`
    color: #666;
    padding-top: 9px;
    padding-bottom: 6px;
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
`

export const Form = styled.View`
    flex: 1;
    padding: 15px;
`


export const ViewFlexRow = styled.View`
    flex-direction : row;
`

export const RadioButtonView = styled.View`
    flex-direction: row;
    align-items: center;
    height: 50px;
`

export const CenteredView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-top: 22px;
`
export const SmallInputText = styled.TextInput`
    height: 40px;
    width: 60px;
    overflow: hidden;
    border-color: gray;
    text-align: center;
    color: #444;
    border-radius: 5px;
    border-width: 1px;
    margin-bottom: 10px;
    margin-top: 5px;
    padding: 10px;
`

export const BorderlessInputText = styled.TextInput`
    width: 40px;
    overflow: hidden;
    text-align: center;
    border-bottom-width: 1px;
    color: #444;
    border-color: #bbb
    margin-bottom: 10px;
    margin-left: 30px;
    padding-bottom: 3px;
`