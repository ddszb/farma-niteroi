import React, { useState } from 'react'
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity
} from "react-native"

import doseUnits from '../../../constants/doseUnits'
import doseTimes from '../../../constants/doseTimesSelection'
import TreatmentSpinner from '../../../components/Spinner'
import DoseHourDialog from './DoseHourDialog'
import DateTimePicker from '@react-native-community/datetimepicker'

import moment from 'moment'
import 'moment/locale/pt-br'

export default props =>{
    
    var defaultDate = new Date()
    defaultDate.setMinutes(0)
    defaultDate.setHours(8)
    
    const initialState = {
        doseHoursItems: [{ time: defaultDate, amount: 1, unit: props.unit.key, index: 0}],
        selectedDose: 0,
        showDialog: false,
        showDoseHourPicker: false,
        dialogTime: defaultDate
    }
    
    const [state, setState] = useState(initialState)


    /**
     * Atualiza a hora da dose selecionada
     * @param {String} event Tipo do evento de ação do DatePicker
     * @param {Date} date Data selecionada
     * @returns 
     */
    const __updateDoseItem = (event, date) =>{
        if(date === undefined){
            setState({...state, showDoseHourPicker: false})
            return
        }
        if(event.type === "set"){
            // Atualizando dose selecionada
            var doses = state.doseHoursItems
            var index = state.selectedDose
            var selectedDose = doses[index]
            selectedDose.time = date
            
            // Atualizando lista
            doses.splice(index, 1, selectedDose)

            
            // Atualizando estado
            setState({
                ...state,
                selectedDose: index,
                doseHoursItem: doses,
                dialogTime: date,
                showDoseHourPicker: false,
            })
            console.warn("BC:", state.dialogTime, doses )
        }else{
            setState({
                ...state,
                showDoseHourPicker: false,
            })
        }
        
    }

    /**
     * Atualiza o horário das doses a serem tomadas de acordo
     * com o horário inicial passado como parâmetro
     * @param {Number} amountInADay quantidade de doses no dia
     * @param {Number} startHour horário inicial
     * @param {Number} startMinute minuto iniciais
     * @returns 
     */
    const __updateDoseTimes = (amountInADay, startHour, startMinute) =>{
        var interval = 24 / amountInADay;
        
        doseHours = []
        for( i = 0; i < amountInADay; i++){
            let startTime = startHour + (i * interval)
            let doseTime = new Date()
            doseTime.setHours(startTime)
            doseTime.setMinutes(startMinute)
            let doseHour = {
                time: doseTime,
                amount: 1,
                unit: props.unit.key,
                index: i
            }
            doseHours.push(doseHour)
        }
        
        // Se passou para o dia seguinte
        if(doseHours[doseHours.length - 1].time.getDate() > doseHours[0].time.getDate()){
            var offsetHours = doseHours[doseHours.length - 1].time.getHours() 
            for( i = 0; i < doseHours.length; i++){
                let adjustedHour = doseHours[i].time.getHours() - offsetHours
                doseHours[i].time.setHours(adjustedHour)
            }
        }
        
        setState({
            ...state,
            doseHoursItems: doseHours,
        })
        props.onUpdate(doseHours)
    }
        
    /**
     * Atualiza informações de quantidade e unidade de medida de uma dose
     * @param {Number} amount A quantidade a ser tomada na dose
     * @param {String} unit A unidade de medida da dose
     */
    const __updateItem = (amount) =>{
        var doses = state.doseHoursItems
        var index = state.selectedDose
        var dose = doses[index]
        dose.amount = amount
        
        setState({
            ...state,
            selectedDose: dose.index,
            doseHoursItems: doses,
            showDialog: false
        })
        props.onUpdate(doses)
    }

    /**
     * Atualiza o estado para não mostrar o dialog de unidade de dosagem
     */
    const __closeDialog = () =>{
        setState({ ...state, showDialog: false})
    }

    /**
     * Atualiza o horário das doses para sugerir um novo cronograma a 
     * partir do horário da primeira dose da lista
     * @param {Array} doses A lista das doses que devem ser atualizadas
     * @returns A lista com horários ajustados
     */
    const __shiftDoseTimes = (doses) =>{
        const newDoses = []
        var offset = doses[0].time.getHours() - 8
        for(var i = 0; i < doses.length; i++){
            let dose = doses[i]
            let hours = dose.time.getHours()
            dose.setHours( hours + offset < 24 ? hours + offset : 24 - hours + offset)
            newDoses.push(dose)
        }
        return newDoses
    }
    
    /**
     * Cria a lista de doses de acordo com a opção selecionada no spinner
     * @param {doseTimes} doseTimesSelection Quantidade de doses que serão tomadas em um dia
     */
    const __createDoseTimes = (doseTimeSelection) =>{
        // Cria doses com horário inicial padrão de 8:00
        __updateDoseTimes(parseInt(doseTimeSelection.value), 8, 0)
    }

    /**
     * Retorna o JSX da lista de doses para renderização em tela
     * @returns JSX da lista
     */
    const __doseHoursItemList = () =>{
        const doses = state.doseHoursItems
        return doses.map( d =>{
            var time = moment(d.time).format("HH:mm")
            return (
                <View key={d.index}>
                    <View style={{flexDirection : 'row', justifyContent: 'space-between', padding: 0}}>
                        <TouchableOpacity
                            onPress={ () => {
                                setState({
                                ...state,
                                selectedDose: d.index,
                                dialogTime: d.time,
                                showDoseHourPicker: true,
                            })}}
                            >
                            <View style={{flexDirection : 'row'}}>
                                <Text style={style.doseHourText}>
                                    {time}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={ () => {
                                setState({
                                    ...state,
                                    selectedDose: d.index,
                                    showDialog: true
                                })}}
                            >
                            <View>
                                <Text style={style.doseHourAmount}>{"Tomar " + d.amount + " " +  props.unit.label + "(s)"}</Text>
                            </View>
                        </TouchableOpacity>
                        { state.showDoseHourPicker && 
                        (<DateTimePicker
                            value={state.dialogTime}
                            mode="time"
                            is24Hour={true}
                            display="spinner"
                            textColor="#63488c"
                            minuteInterval={5}
                            onChange={__updateDoseItem}/>)
                        }
                    </View>
                    <DoseHourDialog 
                        visible={state.showDialog} 
                        dose={d}
                        close={__closeDialog}
                        onSet={__updateItem}/>
                </View>
            )
        })
    }

    /**
     * Renderização da tela
     */
    return(
        <>
            <TreatmentSpinner items={doseTimes} onChangeValue={__createDoseTimes}/> 
            {__doseHoursItemList()}
        </>
    )
}

const style = StyleSheet.create({
    doseHourText:{
        color:'#63488c',
        fontWeight: 'bold', 
        fontSize: 20
    },
    doseHourAmount:{
        color:'#63488c',
        fontSize: 18
    }
})