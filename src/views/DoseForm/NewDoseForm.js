import React, {useState} from 'react'
import { TouchableOpacity, ToastAndroid, Alert }  from 'react-native'

import moment from 'moment'
import 'moment/locale/pt-br'
import { AmountInput, AmountText, ButtonText, ButtonView, CancelButton, CenteredView, ConfirmButton, Form, FormFieldLabel, HourText, LeftPadding, PickerView, RowView } from './styles'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import AsyncStorage from '@react-native-async-storage/async-storage'
import doseStatus from '../../constants/doseStatus'
import storageKeys from '../../constants/storageKeys'
import MedPicker from '../../components/DropdownPicker'
import * as Calculate from '../../util/UtilitarioCalculo'
import colors from '../../styles/colors'

export default props =>{
    
    const {meds} = props.route.params

    const options = meds.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
    const [time, setTime] = useState(new Date())
    const [amount, setAmount] = useState('0')
    const [showTimePicker, setShowTimePicker] = useState(false)
    const [medName, setMedName] = useState() 
    const [selectedMed, setSelectedMed] = useState()

    const saveMed = async (med)=>{
        var newMeds = meds.map( m => m.id == med.id ? med : m)
        AsyncStorage.setItem(storageKeys.MEDS, JSON.stringify(newMeds))
        props.navigation.goBack()
    }


    const onCancel = () =>{
        props.navigation.goBack()
    }

    const onConfirm = () =>{

        var taken = moment(time) < moment()
        var error = ''
        if(amount == '0' || amount == ''){
            error = "Por favor informe a quantidade tomada."
        }
        if(!selectedMed){
            error = "Por favor informe o medicamento."
        }
        if(error){
            ToastAndroid.showWithGravityAndOffset(error,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM, 0 , 120)
            return
        }
        let dose = {
            medName: medName,
            medId: selectedMed.id,
            date: taken ? null : time, 
            unit: selectedMed.doseUnit,
            amount: amount,
            dateTaken: taken ? time : null,
            newDate: null,
            status: taken ? doseStatus.TOMADA : doseStatus.NAO_TOMADA,
            icon: selectedMed.icon,
            iconColor: selectedMed.iconColor,
            index: selectedMed.doses.length,
            sporadic: true
        }
        med = {...selectedMed}
        let newStock = Calculate.newStockAfterDose(med, dose)
        med.doses.push(dose)
        med.stock.amount = newStock
        if(newStock <= 0){
            let msg = "Seu estoque atual para o medicamento acabou, lembre-se de atualizar o estoque depois. Confirmar dose?"
            Alert.alert('Aviso de estoque', msg,
            [{ text: 'Não', onPress(){ return }}, 
             { text:'Sim', onPress() { saveMed(med)}}])
            return
        }else{
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

    
    const changeTime = (event, date) =>{
        setShowTimePicker(false)
        if(event.type === "set"){
            setTime(date)
        }
    }

    const getAmountContent = () =>{
        let unit = selectedMed ? selectedMed.doseUnit.label + "(s)" : "Comprimido(s)"

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
                    {unit}
                </AmountText>
            </RowView>
            </>
        )
    }

    const getTimeContent = () =>{
        var taken = moment(time).isSameOrBefore(moment(), 'minute')
        return(
            <>
            <FormFieldLabel>
                Horário
            </FormFieldLabel>
            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                <RowView>
                    <HourText>
                        {moment(time).format("HH:mm")}
                    </HourText>
                    {taken
                    ?<Icon name="check" type="font-awesome" size={28} color={colors.ok}/>
                    :<Icon name="clock-o" type="font-awesome" size={28} color={colors.grey8}/>
                    }
                </RowView>
            </TouchableOpacity>
            </>
        )
    }

    return(
        <>
        <Form>
            {getTimeContent()}
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
                    textColor={colors.primary}
                    timeZoneOffsetInMinutes={-180}
                    minuteInterval={5}
                    onChange={changeTime}/>)
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
                        <Icon name="cancel" type="material-icons" size={36} color={colors.white}/>
                    </RowView>
                </CancelButton>
                <ConfirmButton
                    activeOpacity={0.7}
                    onPress={onConfirm}>
                    <RowView>
                        <ButtonText>
                            Confirmar
                        </ButtonText>
                        <Icon name="check-circle" type="font-awesome" size={36} color={colors.white}/>
                    </RowView>
                </ConfirmButton>
            </RowView>
        </ButtonView>
        </>
    )
}
