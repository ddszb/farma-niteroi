import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";

import DateTimePicker from '@react-native-community/datetimepicker'
import { CardBox, CardContent, DatePickerText, FormFieldLabel, FormFieldLabelLight } from "../styles";
import DurationRadioGroup from "./DurationRadioGroup";
import FrequencyRadioGroup from "./FrequencyRadioGroup";
import moment from 'moment'
import 'moment/locale/pt-br'

/**
 * Componente para os dados de agendamento do medicamento no cadastro de medicamentos.
 */
export default props =>{
    
    const [showDatePicker, setShowDatePicker] = useState(false)

    /**
     * Verifica quantas vezes na semana há medicação.
     * @param {Array} days Mapa de dias na semana em que há medicação
     * @returns 
     */
    const getTimesAWeek = (days) =>{
        var toWeekdays = k => days[k]
        var sum = (a, b) => a + b
        return Object.keys(days).map(toWeekdays).reduce(sum)
    }

    /**
     * Atualiza a data de ínicio do tratamento, se for confirmado no DateTimePicker
     * @param {*} event O tipo de evento do DateTimePicker. "set" para confirmação de data
     * @param {*} date A nova data
     */
    const onChangeStartDate = (event, date) =>{
        setShowDatePicker(false)
        if(event.type === "set"){
            let startDate = new Date(date)
            startDate.setHours(0)
            startDate.setMinutes(0)
            props.onChangeStartDate(startDate)
        }
    }

    /**
     * Verifica se a quantidade de dias na semana é maior que zero. S
     * e sim, salva no medicamento
     * @param {Array} weekdays Mapa de dias na semana em que há medicação
     * @returns 
     */
    const onChangeWeekdays = (weekdays) =>{
        if(getTimesAWeek(weekdays) == 0){
            return
        }
        props.onChangeWeekdays(weekdays)
    }

    return(
        <>
        {props.med.scheduledDoses &&
        <CardBox>
            <CardContent>
                <View>
                    <FormFieldLabel>Cronograma</FormFieldLabel>
                    <FormFieldLabelLight>início</FormFieldLabelLight>
                    <TouchableOpacity onPress={ () => setShowDatePicker(true)}>
                        <DatePickerText>
                            {moment(props.med.startDate).format('DD/MM/YYYY')}
                        </DatePickerText>
                    </TouchableOpacity>
                    <FormFieldLabelLight>duração</FormFieldLabelLight>
                    <DurationRadioGroup 
                        onChangeValue={props.onChangeTotalDays}/>
                    <FormFieldLabelLight>frequência</FormFieldLabelLight>
                    <FrequencyRadioGroup 
                        onChangeDays={onChangeWeekdays}
                        days={props.med.weekdays}/>
                </View>
                {showDatePicker && 
                <DateTimePicker 
                    value={props.med.startDate}
                    minimumDate={new Date()}
                    onChange={onChangeStartDate}
                    mode="date"/>}
            </CardContent>
        </CardBox>}
        </>
    )
}