import styled from "styled-components/native"

export const FormFieldLabel = styled.Text`
    color: #63488c;
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
    min-width: 300px;
    margin-right: 10px;
`

export const FormInputAsLabel = styled.TextInput`
   font-size: 20px;
   color: #63488c;
   font-weight: bold;
   margin-top: 5px; 
   margin-left: 5px;
   width: 55px;
   text-align: center;
`

export const LargeFormInputTextField = styled.TextInput`
    height: 40px;
    border-color: gray;
    color: #444;
    border-radius: 5px;
    border-width: 1px;
    margin-bottom: 10px;
    margin-top: 5px;
    padding: 10px;
    height: 94px;
    text-align: left;
    justify-content: flex-start;
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
    margin-bottom: 8px;
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
    align-items: center;    
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

export const BorderInputText = styled.TextInput`
    width: 46px;
    height: 40px;
    overflow: hidden;
    text-align: center;
    border-width: 1px;
    border-radius: 5px;
    color: #444;
    border-color: #bbb
    margin-left: 30px;
`

export const Button = styled.View`
    border-radius: 25px;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 5px;
    padding-bottom: 5px;
    max-width: 190px;
    justify-content: center;
    margin-left: 10px;
    margin-right: 10px;
    align-self: flex-end;
    color: #63488c;
    background: #63488c;
`

export const ButtonText = styled.Text`
    color: white;
    font-size: 22px;
    text-align: center;
`

export const DatePickerText = styled.Text`
    margin: 10px;
    font-size: 20px;
    color: #666;
`