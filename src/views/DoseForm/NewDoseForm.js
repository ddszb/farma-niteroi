import React, {useState} from 'react'
import { TouchableOpacity, ToastAndroid }  from 'react-native'

import moment from 'moment'
import 'moment/locale/pt-br'
import { AmountInput, AmountText, ButtonText, ButtonView, CancelButton, CardBox, CardContent, ConfirmButton, Form, FormFieldLabel, HourText, LeftPadding, PickerView, RowView } from './styles'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import AsyncStorage from '@react-native-async-storage/async-storage'
import doseStatus from '../../constants/doseStatus'
import AutoCompleteInput from '../../components/AutoCompleteInput'
import UnitSpinner from '../../components/Spinner'
import doseUnitsSelection from '../../constants/doseUnitsSelection'
import storageKeys from '../../constants/storageKeys'
import doseUnits from '../../constants/doseUnits'

export default props =>{
    
    const {meds} = props.route.params

    const options = meds.map((med, index )=> ({key: index, value: med.name}))
                                            .sort((a, b) => a.value.toLowerCase() > b.value.toLowerCase() ? 1 : -1)
    const [time, setTime] = useState(new Date())
    const [amount, setAmount] = useState('0')
    const [unit, setUnit] = useState(doseUnits.COMPRIMIDO)
    const [showTimePicker, setShowTimePicker] = useState(false)
    const [medName, setMedName] = useState() 
    const [selectedMed, setSelectedMed] = useState()

    const saveMed = async (med)=>{
        var newMeds = meds.map( m => m.name == med.name ? med : m)
        AsyncStorage.setItem(storageKeys.MEDS, JSON.stringify(newMeds))
        props.navigation.goBack()
    }

    const saveSporadicDose = async (dose)=>{
        const dosesString = await AsyncStorage.getItem(storageKeys.SPORADIC_DOSES)
        const doses = JSON.parse(dosesString) || []
        dose.index = doses.length + 1
        doses.push(dose)
        AsyncStorage.setItem(storageKeys.SPORADIC_DOSES, JSON.stringify(doses))
        props.navigation.goBack()
    }

    const onCancel = () =>{
        props.navigation.goBack()
    }

    const onConfirm = () =>{
        var error = ''
        if(amount == '0'){
            error = "Por favor informe a quantidade tomada."
        }
        if(error){
            ToastAndroid.showWithGravityAndOffset(error,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM, 0 , 120)
            return
        }
        let dose = {
            medName: medName,
            date: null, 
            unit: selectedMed ? selectedMed.stock.unit : unit,
            amount: amount,
            dateTaken: time,
            newDate: null,
            status: doseStatus.TOMADA,
            icon: selectedMed ? selectedMed.icon : "med_pill",
            iconColor: selectedMed ? selectedMed.iconColor : "#888",
            index: selectedMed ? selectedMed.doses.length : -1,
            sporadic: true
        }
        if(selectedMed){
            med = {...selectedMed}
            med.doses.push(dose)
            med.stock.amount -= parseInt(amount)
            saveMed(med)
        }else{
            saveSporadicDose(dose)
        }
    }

    const onSelectMed = value =>{        
        var med = meds.filter(m => m.name.toLowerCase() == value.toLowerCase())
        if(med.length > 0){
            setSelectedMed(med[0])
            setUnit(med[0].stock.unit)
        }else{
            setSelectedMed(null)
        }
        setMedName(value)
    }


    const changeAmount = (amount) =>{
        amount = amount.replace(/[^0-9]/g, '')
        if (amount == "0"){
            amount = "1"
        }
        setAmount(amount)
    }

    const changeUnit = (item) =>{
        let unit = doseUnits[item.value]
        setUnit(unit)
    }

    const getAmountContent = ()=>{
        if(selectedMed){
            return (              
                <>
                <FormFieldLabel>
                    Quantidade
                </FormFieldLabel> 
                <RowView>
                    <AmountInput
                    keyboardType="numeric"
                    onChangeText={changeAmount}
                    value={amount}
                    maxLength={4}/>
                    <AmountText>
                        {selectedMed.stock.unit.label + "(s)" }
                    </AmountText>
                </RowView>
                </>
            )
        }else{
            return(
                <>
                <FormFieldLabel>
                    Quantidade
                </FormFieldLabel>
                <LeftPadding>
                    <RowView>
                        <AmountInput
                            keyboardType="numeric"
                            onChangeText={changeAmount}
                            value={amount}
                            maxLength={4}/>
                        <UnitSpinner 
                            items={doseUnitsSelection} 
                            value={unit.label}
                            onChangeValue={changeUnit}/>
                    </RowView>
                </LeftPadding>
                </>
            )
        }
    }

    return(
        <>
        <Form>
            <FormFieldLabel>
                Horário
            </FormFieldLabel>
            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                <HourText>
                    {moment(time).format("HH:mm")}
                </HourText>
            </TouchableOpacity>
            {getAmountContent()}
            <FormFieldLabel>
                Medicamento
            </FormFieldLabel>
                <AutoCompleteInput
                    data={options}
                    placeholder={"Medicamento"}
                    onChange={onSelectMed}
                />
                
            { showTimePicker && 
                (<DateTimePicker
                    value={time}
                    mode="time"
                    is24Hour={true}
                    display="spinner"
                    textColor="#63488c"
                    timeZoneOffsetInMinutes={-180}
                    minuteInterval={5}
                    onChange={(_, date) => {
                        let hours = date.getHours() - (date.getTimezoneOffset() / 60)
                        date.setHours(hours)
                        setShowTimePicker(false)
                        setTime(new Date(date))
                    }}/>)
            }
        </Form>
        <ButtonView>
            <RowView>
                <CancelButton
                    activeOpacity={0.5}
                    onPress={onCancel}>
                    <RowView>
                        <ButtonText>
                            Cancelar
                        </ButtonText>
                        <Icon name="cancel" type="material-icons" size={36} color="#fff"/>
                    </RowView>
                </CancelButton>
                <ConfirmButton
                    activeOpacity={0.7}
                    onPress={onConfirm}>
                    <RowView>
                        <ButtonText>
                            Confirmar
                        </ButtonText>
                        <Icon name="check-circle" type="font-awesome" size={36} color="#fff"/>
                    </RowView>
                </ConfirmButton>
            </RowView>
        </ButtonView>
        </>
    )
}
