import React, { useEffect, useState } from 'react'
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity
} from "react-native"

import doseTimes from '../../../constants/doseTimesSelection'
import TreatmentSpinner from '../../../components/Spinner'
import DateTimePicker from '@react-native-community/datetimepicker'

import moment from 'moment'
import 'moment/locale/pt-br'
import InputModal from '../../../components/InputModal'
import colors from '../../../styles/colors'

export default props =>{
    
    var defaultDate = new Date()
    defaultDate.setMinutes(0)
    defaultDate.setHours(8)

    useEffect(() =>{
        resetUnit()
    }, [props.unit])

    const liquidDose = props.unit.liquid

    const [doseHoursItems, setDoseHoursItems] = useState([{ time: defaultDate, amount: 1, unit: props.unit, index: 0}])
    const [selectedDose, setSelectedDose] = useState(0)
    const [showDialog, setShowDialog] = useState(false)
    const [showPicker, setShowPicker] = useState(false)
    const [dialogTime, setDialogTime] = useState(defaultDate)


    /**
     * Atualiza a apresentação (unit) das doses marcadas quando a apresentação do medicamento é alterada.
     */
    const resetUnit = () =>{
        doseHoursItems.forEach( d => d.unit = props.unit)
    }

    /**
     * Atualiza a hora da dose selecionada
     * @param {String} event Tipo do evento de ação do DatePicker
     * @param {Date} date Data selecionada
     * @returns 
     */
    const __updateDoseItem = (event, date) =>{
        if(date === undefined){
            setShowPicker(false)
            return
        }
        if(event.type === "set"){
            // Atualizando dose selecionada
            var doses = [...doseHoursItems]
            var index = selectedDose
            var dose = doses[index]
            var invalidDate = false
            doses.forEach( d =>{
                if(d.time.getHours() == date.getHours() && d.time.getMinutes() == date.getMinutes()){
                    invalidDate = true
                }
            })
            if(invalidDate){
                setShowPicker(true)
                return
            }
            dose.time = new Date(date)
            
            // Atualizando lista
            doses.splice(index, 1, dose)

            if(index == 0){
                doses = __shiftDoseTimes(doses)
            }
            // Atualizando estado
            setShowPicker(false)
            setDoseHoursItems(doses)
            props.onUpdate(doses)
        }else{
            setShowPicker(false)
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
                unit: props.unit,
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
        setDoseHoursItems(doseHours)
        props.onUpdate(doseHours)
    }
        
    /**
     * Atualiza informações de quantidade de medida de uma dose
     * @param {Number} amount A quantidade a ser tomada na dose
     * @param {doseUnit} unit A unidade de medida da dose
     */
    const updateDoseAmount = (amount) =>{
        var doses = [...doseHoursItems]
        var index = selectedDose
        var dose = doses[index]
        dose.amount = amount

        setDoseHoursItems(doses)
        setShowDialog(false)
        props.onUpdate(doses)
    }

    /**
     * Atualiza o estado para não mostrar o dialog de unidade de dosagem
     */
    const __closeDialog = () =>{
        setShowDialog(false)
    }

    /**
     * Atualiza o horário das doses para sugerir um novo cronograma a 
     * partir do horário da primeira dose da lista
     * @param {Array} doses A lista das doses que devem ser atualizadas
     * @returns A lista com horários ajustados
     */
    const __shiftDoseTimes = (doses) =>{
        var interval = 24 / doses.length;
        var startHour = doses[0].time.getHours()
        var startMinute = doses[0].time.getMinutes()

        doseHours = []
        for( i = 0; i < doses.length; i++){
            let startTime = startHour + (i * interval)
            let doseTime = new Date()
            doseTime.setHours(startTime)
            doseTime.setMinutes(startMinute)
            doses[i].time = doseTime
        }
        return doses
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
        const doses = doseHoursItems
        return doses.map( d =>{
            var time = moment(d.time).format("HH:mm")
            return (
                <View key={d.index}>
                    <View style={{flexDirection : 'row', justifyContent: 'space-between', paddingVertical: 6}}>
                        <TouchableOpacity
                            onPress={ () => {
                                setSelectedDose(d.index)
                                setDialogTime(d.time)
                                setShowPicker(true)
                                }}>
                            <View style={{flexDirection : 'row'}}>
                                <Text style={style.doseHourText}>
                                    {time}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={ () => {
                                setSelectedDose(d.index)
                                setShowDialog(true)
                                }}>
                            <View>
                                <Text style={style.doseHourAmount}>{"Tomar " + d.amount + " " +  props.unit.label + "(s)"}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                    <InputModal
                        visible={showDialog}
                        title={"Quanto tomar?"}
                        initialValue={'' + d.amount}
                        inputType={"numeric"}
                        inputText={props.unit.label + "(s)"}
                        keepOldText={true}
                        inputLength={4}
                        close={__closeDialog}
                        onSet={updateDoseAmount}/>
                </View>
            )
        })
    }

    /**
     * Renderização da tela
     */
    return(
        <>
        <View style={style.pickers}>
            <TreatmentSpinner items={doseTimes} onChangeValue={__createDoseTimes}/> 
        </View>
        <View style={style.list}>
            {__doseHoursItemList()}
        </View>
            { showPicker && 
                (<DateTimePicker
                    value={dialogTime}
                    mode="time"
                    is24Hour={true}
                    display="spinner"
                    textColor={colors.primary}
                    timeZoneOffsetInMinutes={-180}
                    minuteInterval={2}
                    onChange={__updateDoseItem}/>)
            }
        </>
    )
}

const style = StyleSheet.create({
    doseHourText:{
        color: colors.primary,
        fontWeight: 'bold', 
        fontSize: 20
    },
    doseHourAmount:{
        color: colors.primary,
        fontSize: 18
    },
    pickers:{
        flex: 0.2
    },
    list:{
        paddingTop: 12,
        marginTop: 12,
        flex: 0.8
    }
})