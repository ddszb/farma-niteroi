import React from "react";
import { View } from "react-native";
import { CardBox, CardContent, FormFieldLabel, LargeFormInputTextField } from "../styles";

/**
 * Componente para as observações de um medicamento no cadastro de medicamentos.
 */
export default props =>{
    
    return(
        <CardBox>
        <CardContent>
            <View>
                <FormFieldLabel>Observações</FormFieldLabel>
                <LargeFormInputTextField
                    onChangeText={props.onChange}
                    value={props.med.notes}    
                    maxLength={200}
                    multiline={true}
                    numberOfLines={5}/>
            </View>
        </CardContent>
    </CardBox>
    )
}