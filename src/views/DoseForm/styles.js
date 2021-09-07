import styled from 'styled-components'

export const Container = styled.View`
    flex: 0.8;

`

export const FormFieldLabel = styled.Text`
    color: #63488c;
    font-weight: bold;
    font-size: 26px;
    text-align: center;
`
export const HourText = styled.Text`
    color:#777;
    font-weight: bold; 
    font-size: 23px;
    text-align: center;
    margin-vertical: 16px;
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

export const RowView = styled.View`
    flex-direction : row;
    align-items: center;
    justify-content: center;
`

export const CenteredView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-top: 22px;
`

export const AmountInput = styled.TextInput`
    overflow: hidden ;
    text-align: center;
    color:#777;
    font-weight: bold;
    font-size: 20px;
    margin-vertical: 16px;
    margin-bottom: 1px;
    border-width: 1px;
    border-radius: 5px;
    border-color: #bbb;
    width: 60px;
`

export const AmountText = styled.Text`
    text-align: justify;
    margin: 16px;
    margin-bottom: 5px;
    font-size: 18px;
    font-weight: bold;
    color: #777;
`
export const PickerView = styled.View`
    justify-content: center;
    align-items:center;
    border-width: 1px;
    border-radius: 5px;
    border-color: #ccc;
    margin-vertical: 16px;
`

export const ButtonView = styled.View`
    flex: 0.2;
    justify-content: flex-end;
`
export const ConfirmButton = styled.TouchableOpacity`
    flex: 1;
    background-color: #40a843;
    justify-content: center;
    align-items: center;
    height: 110px;
`

export const CancelButton = styled.TouchableOpacity`
    flex: 1;
    background-color: #bbb;
    justify-content: center;
    align-items: center;
    height: 110px;
`

export const ButtonText = styled.Text`
    font-size: 24px;
    color: white;
    font-weight: bold;
    margin: 12px;
`

export const LeftPadding = styled.View`
    padding-left: 51px;
`