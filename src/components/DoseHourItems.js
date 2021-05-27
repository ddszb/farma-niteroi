import React, { useContext, useState } from 'react'
import {
    Text,
    StyleSheet,
    TextInput,
    View,
    Switch,
    TouchableOpacity
} from "react-native"

import doseUnits from '../constants/doseUnits'
import doseTimes from '../constants/doseTimes'
import TreatmentSpinner from '../components/TreatmentSpinner'

import DateTimePicker from '@react-native-community/datetimepicker'

export default props =>{

    const [doseHoursItems, setDoseHoursItems] = useState([{ hour: 8, minute: 0, amount: 1, unit: doseUnits.COMPRIMIDO, index: 0}])
    const [showDoseHourPicker, setShowDoseHourPicker] = useState(false)
    const [selectedDose, setSelectedDose] = useState(doseHoursItems[0])
    const [selectedDoseTime, setselectedDoseTime] = useState(new Date())

    const updateDoseHourItem = (event, date) =>{
        const currDate = date || getSelectedDoseDate()
        var dose = selectedDose
        dose.hour = currDate.getHours()
        dose.minute = currDate.getMinutes()
        setShowDoseHourPicker(false)
        setSelectedDose(currDate)
        updateList()
    }

    getSelectedDoseDate = () =>{
        var date = new Date()
        if(selectedDose){
            date.setHours(selectedDose.hour)
            date.setMinutes(selectedDose.minute)
        }
        return date
    }

    const updateList = () =>{
        var doses = doseHoursItems
        doses.splice(selectedDose.index, 1, selectedDose)
        setDoseHoursItems(doses)
    }

    const shiftDoseTimes = (doses) =>{
        const newDoses = []
        offset = 8 - doses[0].hour
        for(var i = 0; i < doses.length; i++){
            let dose = doses[i]
            dose.hour = doses[i] + offset >= 24 ? doses[i] + offset : 24 - doses[i] + offset
            newDoses.push(dose)
        }
        return newDoses
    }

    const createDoseTimes = (value) =>{
        var defaultStartHour = 8
        var defaultStartMinute = 0
        var amountInADay = value;
        var interval = 24 / amountInADay;
        
        doseHours = []
        for( i = 0; i < amountInADay; i++){
            let startTime = defaultStartHour + (i * interval)
            let doseHour = {
                hour : startTime,
                minute : defaultStartMinute,
                amount: 1,
                unit: doseUnits.COMPRIMIDO,
                index: i
            }
            doseHours.push(doseHour)
        }
        var offsetHours = doseHours[doseHours.length - 1].hour - 24
        
        offsetHours = offsetHours > 0 ? offsetHours : 0
        for( i = 0; i < doseHours.length; i++){
            let adjustedHour = doseHours[i].hour - offsetHours
            doseHours[i].hour = adjustedHour === 24 ? 0 : adjustedHour
        }
        
        setDoseHoursItems(doseHours)
    }
    
    const doseHoursItemList = () =>{
        return doseHoursItems.map( d =>{
            return (
                    <View style={{flexDirection : 'row', justifyContent: 'space-between', padding: 4}}>
                        <TouchableOpacity
                                onPress={ () => {
                                    setSelectedDose(d)
                                    setShowDoseHourPicker(true)
                                }}
                            >
                            <View style={{flexDirection : 'row'}}>
                                <Text style={style.doseHourText}>
                                    {d.hour.toString().padStart(2, '0')}:
                                </Text>
                                <Text style={style.doseHourText}>
                                    {d.minute.toString().padStart(2, '0')}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View>
                                <Text style={style.doseHourAmount}>{d.amount + " " +  d.unit + "(s)"}</Text>
                            </View>
                        </TouchableOpacity>
                        { showDoseHourPicker && 
                        (<DateTimePicker
                            value={getSelectedDoseDate()}
                            mode="time"
                            is24Hour={true}
                            display="spinner"
                            textColor="#6f11fd"
                            minuteInterval={5}
                            onChange={updateDoseHourItem}
                        />)}
                    </View>
            )
        })
    }

    return(
        <>
            <TreatmentSpinner items={doseTimes} onChangeValue={createDoseTimes}/> 
            {doseHoursItemList()}
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