import React from "react";
import { Text, View } from "react-native";
import { Switch } from "react-native";
import colors from "../../../styles/colors";
import { CardBox, CardContent, FormFieldLabel, ViewFlexRow } from "../styles";
import DoseHourItems from "./DoseHourItems";

/**
 * Componente para marcação de horário das doses no cadastro de medicamento.
 */
export default props =>{
    
    return(
        <CardBox>
            <CardContent>
                <ViewFlexRow>
                    <FormFieldLabel>Doses Marcadas</FormFieldLabel>
                    <Switch
                        trackColor={{ false: colors.grey8, true: colors.purpleBright }}
                        thumbColor={props.med.scheduledDoses ? colors.primary : colors.grey12}
                        ios_backgroundColor={colors.grey4}
                        onValueChange={props.onChangeScheduledDoses}
                        value={props.med.scheduledDoses}
                    />
                </ViewFlexRow>
                <View>
                    {props.med.scheduledDoses 
                    ?<View>
                        <DoseHourItems
                            unit={props.med.doseUnit}
                            onUpdate={props.onChangeDoseHours}/>
                    </View>
                    :<Text>Tomar quando necessário</Text>} 
                </View>
            </CardContent>
        </CardBox>
    )
}