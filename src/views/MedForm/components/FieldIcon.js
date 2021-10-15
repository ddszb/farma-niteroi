import React from "react";
import { View } from "react-native";
import { CardBox, CardContent, FormFieldLabel } from "../styles";
import IconPicker from "./IconPicker";

/**
 * Componente para seleção de ícone/cor do medicamento no cadastro de medicamento.
 */
export default props =>{
    
    return(
        <CardBox>
            <CardContent>
                <View>
                    <FormFieldLabel>Ícone</FormFieldLabel>
                    <IconPicker onChangeIcon={props.onChangeIcon} onChangeColor={props.onChangeColor}/>
                </View>
            </CardContent>
        </CardBox>
    )
}