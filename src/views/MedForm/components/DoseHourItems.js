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
export default props =>{

    var defaultDate = new Date()
    defaultDate.setMinutes(0)
    defaultDate.setHours(8)

    const [state, setState] = useState({
        doseHoursItems: [{ time: defaultDate, amount: 1, unit: doseUnits.COMPRIMIDO.key, index: 0}],
        selectedDose: 0,
        showDialog: false,
        showDoseHourPicker: false,
    })

    const __updateDoseTime = (event, date) =>{
        if(event.type === "set"){
            // Atualizando dose selecionada
            var doses = state.doseHoursItems
            var index = state.selectedDose
            var selectedDose = doses[index]
            selectedDose.time = date
            
            // Atualizando lista
            doses.splice(index, 1, selectedDose)
            // if(dose.index == 0){
            //     doses = __shiftDoseTimes(doses)
            // }
            
            // Atualizando estado
            setState({
                ...state,
                selectedDose: index,
                doseHoursItem: doses,
                showDoseHourPicker: false,
            })
        }else{
            setState({
                ...state,
                showDoseHourPicker: false,
            })
        }
        
    }

    const __shiftDoseTimes = (doses) =>{
        const newDoses = []
        offset = 8 - doses[0].getHours()
        for(var i = 0; i < doses.length; i++){
            let dose = doses[i]
            dose.setHours(doses[i] + offset >= 24 ? doses[i] + offset : 24 - doses[i] + offset)
            newDoses.push(dose)
        }
        return newDoses
    }

    const __createDoseTimes = (value) =>{
        var defaultStartHour = 8
        var defaultStartMinute = 0
        var amountInADay = value;
        var interval = 24 / amountInADay;
        
        doseHours = []
        for( i = 0; i < amountInADay; i++){
            let startTime = defaultStartHour + (i * interval)
            let doseTime = new Date()
            doseTime.setHours(startTime)
            doseTime.setMinutes(defaultStartMinute)
            let doseHour = {
                time: doseTime,
                amount: 1,
                unit: doseUnits.COMPRIMIDO.key,
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
    }

    const __updateItem = (amount, unit) =>{
        var doses = state.doseHoursItems
        var index = state.selectedDose
        var dose = doses[index]
        dose.amount = amount
        dose.unit = doseUnits[unit].key
        
        doses.splice(index, 1, dose)
        doses = doses.map( d => {return {...d, unit}})
        
        setState({
            ...state,
            selectedDose: dose.index,
            doseHoursItems: doses,
            showDialog: false
        })
    }

    const __closeDialog = () =>{
        setState({ ...state, showDialog: false})
    }

    const __doseHoursItemList = () =>{
        const doses = state.doseHoursItems
        return doses.map( d =>{
            return (
                <>
                    <View key={d.index} style={{flexDirection : 'row', justifyContent: 'space-between', padding: 0}}>
                        <TouchableOpacity
                            onPress={ () => { setState({
                                ...state,
                                selectedDose: d.index,
                                showDoseHourPicker: true,
                            })}}
                            >
                            <View style={{flexDirection : 'row'}}>
                                <Text style={style.doseHourText}>
                                    {d.time.getHours().toString().padStart(2, '0')}:
                                </Text>
                                <Text style={style.doseHourText}>
                                    {d.time.getMinutes().toString().padStart(2, '0')}
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
                                <Text style={style.doseHourAmount}>{"Tomar " + d.amount + " " +  doseUnits[d.unit].label + "(s)"}</Text>
                            </View>
                        </TouchableOpacity>
                        { state.showDoseHourPicker && 
                        (<DateTimePicker
                            value={d.time}
                            mode="time"
                            is24Hour={true}
                            display="spinner"
                            textColor="#6f11fd"
                            minuteInterval={5}
                            onChange={__updateDoseTime}
                            />)}
                    </View>
                    <DoseHourDialog 
                        visible={state.showDialog} 
                        dose={d}
                        close={__closeDialog}
                        onSet={__updateItem}/>
                </>
            )
        })
    }

    return(
        <>
            <TreatmentSpinner items={doseTimes} onChangeValue={__createDoseTimes}/> 
            {__doseHoursItemList()}
        </>
    )
}

const style = StyleSheet.create({
    doseHourText:{
        color:'#6f11fd',
        fontWeight: 'bold', 
        fontSize: 20
    },
    doseHourAmount:{
        color:'#6f11fd',
        fontSize: 18
    }
})