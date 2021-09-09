import React, {useState} from 'react'
import { TouchableOpacity, ToastAndroid }  from 'react-native'

import moment from 'moment'
import 'moment/locale/pt-br'
import { AmountInput, AmountText, ButtonText, ButtonView, CancelButton, CenteredView, ConfirmButton, Form, FormFieldLabel, HourText, LeftPadding, PickerView, RowView } from './styles'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import AsyncStorage from '@react-native-async-storage/async-storage'
import doseStatus from '../../constants/doseStatus'
import storageKeys from '../../constants/storageKeys'
import MedPicker from '../../components/DropdownPicker'

export default props =>{
    
    const {meds} = props.route.params

    const options = meds.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
    const [time, setTime] = useState(new Date())
    const [amount, setAmount] = useState('0')
    const [showTimePicker, setShowTimePicker] = useState(false)
    const [medName, setMedName] = useState() 
    const [selectedMed, setSelectedMed] = useState()

    const saveMed = async (med)=>{
        var newMeds = meds.map( m => m.name == med.name ? med : m)
        AsyncStorage.setItem(storageKeys.MEDS, JSON.stringify(newMeds))
        props.navigation.goBack()
    }


    const onCancel = () =>{
        props.navigation.goBack()
    }

    const onConfirm = () =>{
        var error = ''
        if(amount == '0' || amount == ''){
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
            unit: selectedMed.stock.unit,
            amount: amount,
            dateTaken: time,
            newDate: null,
            status: doseStatus.TOMADA,
            icon: selectedMed.icon,
            iconColor: "#888",
            index: selectedMed.doses.length,
            sporadic: true
        }
        if(selectedMed){
            med = {...selectedMed}
            med.doses.push(dose)
            med.stock.amount -= parseInt(amount)
            saveMed(med)
        }
    }

    const onSelectMed = med =>{        
        if(med){
            setSelectedMed(med)
            setMedName(med.name)
        }else{
            setSelectedMed(null)
        }
    }


    const changeAmount = (amount) =>{
        amount = amount.replace(/[^0-9]/g, '')
        if (amount == "0"){
            amount = "1"
        }
        setAmount(amount)
    }

    const getAmountContent = ()=>{
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
                    { selectedMed ? selectedMed.stock.unit.label + "(s)"  : "Comprimido(s)"}
                </AmountText>
            </RowView>
            </>
        )
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
            <CenteredView>
                <MedPicker 
                    data={options}
                    title="Medicamento"
                    onSelect={onSelectMed}
                    labelField="name"
                    />
            </CenteredView>
                
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
