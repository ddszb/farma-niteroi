import React, { useState } from "react"

import DateTimePicker from '@react-native-community/datetimepicker'
import { TouchableOpacity} from "react-native"
import moment from 'moment'
import 'moment/locale/pt-br'

import {CardBox, CardContent, FormFieldLabel, DatePickerText} from '../styles'

/**
 * Componente para o campo de "data de validade" do cadastro de medicamento.
 */
export default props =>{
    
    // Data mínima para data de validade
    const minimumDate = new Date()
    
    const [showExpireDatePicker, setShowExpireDatePicker] = useState(false)
    
    /**
     * Fecha o DateTimePicker após mudança na data e manda a nova data para o pai.
     * @param {*} event Tipo de evento do date picker. "set" para confirmar 
     * @param {*} date Nova data
     */
    const onChange = (event, date) =>{
        setShowExpireDatePicker(false)
        if(event.type === "set"){
            props.onChange(date)
        }
    }

    return (
        <CardBox>
            <CardContent>
                <FormFieldLabel>Validade</FormFieldLabel>
                <TouchableOpacity
                    onPress={ () => setShowExpireDatePicker(true)}>
                    <DatePickerText>
                        {moment(props.expireDate).format('DD/MM/YYYY')}
                    </DatePickerText>
                </TouchableOpacity>
                {showExpireDatePicker && 
                <DateTimePicker 
                value={props.expireDate}
                minimumDate={minimumDate}
                onChange={onChange}
                mode="date"/>}
            </CardContent>
        </CardBox>
    )
    
}