import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Alert, ToastAndroid, TouchableOpacity } from "react-native";
import doseStatus from "../../../constants/doseStatus";
import storageKeys from "../../../constants/storageKeys";
import { Button, ButtonText } from "../styles";
import * as UtilitarioFormatacao from '../../../util/UtilitarioFormatacao';

export default props =>{

    const __createDayDoses = (medPersist, doses, day, currentTime) =>{
        medPersist.doseHours.forEach( doseTime =>{
            day.setHours(doseTime.time.getHours(), doseTime.time.getMinutes())
            if(day > currentTime){
                var doseDate = new Date(day)
                let dose = {
                    medName: medPersist.name,
                    date: doseDate, 
                    unit: doseTime.unit,
                    amount: doseTime.amount,
                    dateTaken: null,
                    newDate: null,
                    status: doseStatus.NAO_TOMADA,
                    icon: medPersist.icon,
                    iconColor: medPersist.iconColor,
                    index: doses.length,
                    sporadic: false
                }
                doses.push(dose)
            }
        })
    }

    const __createDosesList = (medPersist) => {
        if(!medPersist.scheduledDoses || medPersist.days == 0){
            medPersist.doses = []
        }else{
            var doseDay = new Date(medPersist.startDate)
            var currentTime = new Date()
            var totalIntakes = medPersist.days * medPersist.doseHours.length
            var daysArray = Object.keys(medPersist.weekdays).map(d => medPersist.weekdays[d])
            var doses = []
            while(doses.length < totalIntakes){
                if(daysArray[doseDay.getDay()] == 1){
                    __createDayDoses(medPersist, doses, doseDay, currentTime)
                }
                doseDay.setDate(doseDay.getDate() + 1)
            }
            medPersist.doses = doses
        }
    }


    const __fillMedInfo = (medPersist) =>{   
        medPersist.scheduledDoses = !!props.med.scheduledDoses
        medPersist.icon = medPersist.icon ? medPersist.icon : medicons[0]
        medPersist.iconColor = medPersist.iconColor ? medPersist.iconColor : iconColors[0]
        
        if(medPersist.expireDate){
            medPersist.expireDate = UtilitarioFormatacao.parseDate(medPersist.expireDate)
        }
        if(medPersist.startDate){
            medPersist.startDate = UtilitarioFormatacao.parseDate(medPersist.startDate)
            __createDosesList(medPersist)
        }
         return medPersist        
    }

    const saveMed = async () =>{
        var medPersist = {...props.med}
        medPersist = __fillMedInfo(medPersist)
        const medsString = await AsyncStorage.getItem(storageKeys.MEDS)
        const meds = medsString !== null ? JSON.parse(medsString) : []
        
        const medSequence = await AsyncStorage.getItem(storageKeys.MED_SEQUENCE)
        const medId = medSequence !== null ? parseInt(medSequence) + 1 : 1
        medPersist.id = medId
        
        meds.push(medPersist)
        AsyncStorage.setItem(storageKeys.MED_SEQUENCE, medId.toString())
        AsyncStorage.setItem(storageKeys.MEDS, JSON.stringify(meds))

        props.navigation.goBack()
    }

    const validateMed = async () =>{
        var invalid = false
        var errors  = []
        if(!props.med.name){
            invalid = true
            errors.push("Nome de medicamento obrigatório")
        }else{
            const medsString = await AsyncStorage.getItem(storageKeys.MEDS)
            const meds = medsString !== null ? JSON.parse(medsString) : []
            if(meds.map(m => m.name).includes(props.med.name)){
                invalid = true
                errors.push("Você já cadastrou um medicamento com esse nome.")
            }
        }
        
        if(!props.med.stock.amount || props.med.stock.amount <= 0){
            invalid = true
            errors.push("Por favor informe o estoque da medicação atual")
        }
        if(invalid){
            ToastAndroid.showWithGravityAndOffset(errors[0],
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM, 0 , 90)
            return false
        }
        return true        
    }


    const onPress = async () =>{
        var isValid = await validateMed()
        if(!isValid){
            return
        }
        Alert.alert('Adicionar Medicamento', 'Deseja adicionar o medicamento?',
            [{   
                text: 'Não',
            },
            {
                text:'Sim',
                onPress(){
                    saveMed()
                }
            },
        ])
    }
    return(
        <TouchableOpacity
        onPress={onPress}>
            <Button>
                <ButtonText>
                    Salvar
                </ButtonText>
            </Button>
        </TouchableOpacity>
    )
}