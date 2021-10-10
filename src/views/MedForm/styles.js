import styled from "styled-components/native"
import colors from "../../styles/colors"
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;

export const FormFieldLabel = styled.Text`
    color: ${colors.primary};
    font-weight: bold;
`
export const FormInputTextField = styled.TextInput`
    height: 40px;
    border-color: ${colors.grey8};
    color: ${colors.grey6};
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
   color: ${colors.primary};
   font-weight: bold;
   margin-top: 5px; 
   margin-left: 5px;
   width: 55px;
   text-align: center;
`

export const LargeFormInputTextField = styled.TextInput`
    height: 40px;
    border-color: ${colors.grey8};
    color: ${colors.grey4};
    border-radius: 5px;
    border-width: 1px;
    margin-bottom: 10px;
    margin-top: 5px;
    padding: 10px;
    height: 80px;
    text-align: left;
    justify-content: flex-start;
`

export const FormFieldLabelLight = styled.Text`
    color: ${colors.grey6};
    padding-top: 9px;
    padding-bottom: 6px;
`
export const CardBox = styled.View`
    background-color: ${colors.grey13b};
    border-right-color: ${colors.grey10};
    border-bottom-color: ${colors.grey10};
    border-right-width: 2px;
    border-bottom-width: 2px;
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
    border-color: ${colors.grey8};
    text-align: center;
    color: ${colors.grey4};
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
    color: ${colors.grey4};
    border-color: ${colors.grey10}
    margin-left: 30px;
`

export const ResetButton = styled.TouchableOpacity`
    margin-right: ${windowWidth * 0.02}px;
    margin-top: 7px;
`

export const Button = styled.View`
    border-radius: 5px;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 5px;
    padding-bottom: 5px;
    max-width: 190px;
    justify-content: center;
    margin-left: 10px;
    margin-right: 10px;
    align-self: flex-end;
    color: ${colors.primary};
    background: ${colors.primary};
`

export const ButtonText = styled.Text`
    color: ${colors.white};
    font-size: 20px;
    text-align: center;
    font-weight: bold;
    margin-vertical: 4px;
    margin-horizontal: 10px;
`

export const DatePickerText = styled.Text`
    margin: 10px;
    font-size: 20px;
    color: ${colors.grey6};
`