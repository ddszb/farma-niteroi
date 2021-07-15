import React, {useState } from 'react'
import {
    Text,
    View,
    Switch,
    ScrollView,
    TouchableOpacity,
    ToastAndroid,
    Alert,
} from "react-native"

import * as UtilitarioFormatacao from '../../util/UtilitarioFormatacao'
import DatePicker from '../../components/DatePicker'
import DoseHourItems from './components/DoseHourItems'
import DurationRadioGroup from './components/DurationRadioGroup'
import FrequencyRadioGroup from './components/FrequencyRadioGroup'
import UnitSpinner from '../../components/Spinner'

import medicons from '../../constants/medicons'
import iconColors from '../../constants/iconColors'
import doseUnits from '../../constants/doseUnits'

import { FormFieldLabel, FormInputTextField, LargeFormInputTextField, FormFieldLabelLight,
    ViewFlexRow, CardBox, CardContent, ButtonText, Button, Form, FormInputAsLabel} from './styles'
import IconPicker from './components/IconPicker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import doseUnitsSelection from '../../constants/doseUnitsSelection'
import doseStatus from '../../constants/doseStatus'

const initialState = 
    {
        weekdays: { 0:1, 1:1, 2:1, 3:1, 4:1, 5:1, 6:1},
        days: 7,
        startDate: new Date(),
        scheduledDoses: false,
        icon: medicons[0],
        iconColor: iconColors[0],
        notes: null,
        stock:{
            amount: '0',
            unit: doseUnits.COMPRIMIDO
        }
    }


export default ({navigation, route}) => {

    
    const [med, setMed] = useState(initialState )

    const __setExpireDate = (expireDate) =>{
        setMed({...med, expireDate})
    }
    
    const __onColorChange = (color) =>{
        setMed({...med, iconColor: color})
    }
    const __onIconChange = (icon) =>{
        setMed({...med, icon: icon})
    }
    
    const __setTreatmentstartDate = (startDate) =>{
        setMed({...med, startDate})
    }
    
    const __updateMedUnit = (unitSelection) =>{
        var unit = doseUnits[unitSelection.value]
        setMed({...med, stock:{...med.stock, unit}})
    }

    const __changeFrequencyDays = (weekdays, isDaily) =>{
        if(isDaily){
            weekdays = { 1:1, 2:1, 3:1, 4:1, 5:1, 6:1, 0:1}
        }else{
            if(__getTimesAWeek(weekdays) == 0){
                return
            }
        }
        setMed({...med, weekdays})
    }

    const __validateNewMed = () =>{
        if(!med.name){
            ToastAndroid.showWithGravityAndOffset("Nome de medicamento obrigatório.",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM, 0 , 90)
            return false
        }
        return true        
    }

    const __onPressSaveButton = () =>{
        if(!__validateNewMed()){
            return
        }
        Alert.alert('Adicionar Medicamento', 'Deseja adicionar o medicamento?',
            [{   
                text: 'Não',
            },
            {
                text:'Sim',
                onPress(){
                    __confirmSave()
                }
            },
        ])
    }

    const __setDaysSettings = (days) => {
        setMed({...med,days})
    }

    const __onUpdateDoseHours = (doseHours) =>{
        setMed({...med, doseHours})
    }

    const __getTimesAWeek = (days) =>{
        var toWeekdays = k => days[k]
        var sum = (a, b) => a + b
        return Object.keys(days).map(toWeekdays).reduce(sum)
    }

    const __createDayDoses = (medPersist, doses, day) =>{
        // console.warn("medPersis:", medPersist)
        // console.warn("doses:", medPersist.doseHours)
        console.log("day b4:", day)
        medPersist.doseHours.forEach( doseTime =>{
            day.setHours(doseTime.time.getHours(), doseTime.time.getMinutes())
            var doseDate = new Date(day)
            console.log("day aftter:", day)
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
            }
            doses.push(dose)
        })
    }

    const __createDosesList = (medPersist) => {
        if(!medPersist.scheduledDoses || medPersist.days == 0){
            medPersist.endDate = null
            medPersist.doses = []
        }else{
            var doseDay = new Date(medPersist.startDate)
            var intakes = 0
            var daysArray = Object.keys(medPersist.weekdays).map(d => medPersist.weekdays[d])
            var doses = []
            while(intakes < medPersist.days - 1){
                if(daysArray[doseDay.getDay()] == 1){
                    intakes += 1
                    __createDayDoses(medPersist, doses, doseDay)
                }
                doseDay.setDate(doseDay.getDate() + 1)
                // console.log(doseDay)
            }
            medPersist.endDate = doseDay
            medPersist.doses = doses
            console.log("doses:", JSON.stringify(doses, 0, 2))
        }
    }

    const __fillMedInfo = (medPersist) =>{   
        medPersist.scheduledDoses = !!med.scheduledDoses
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
    
    const __confirmSave = async () =>{
        var medPersist = {...med}
        console.warn("confirmSave:")
        medPersist = __fillMedInfo(medPersist)
        console.warn("medPersis:", medPersist)
        const medsString = await AsyncStorage.getItem('medsList')
        console.warn("medList", medsString)
        const meds = medsString !== null ? JSON.parse(medsString) : []
        
        const medSequence = await AsyncStorage.getItem('medsListSequence')
        const medId = medSequence !== null ? parseInt(medSequence) + 1 : 1
        medPersist.id = medId
        
        console.warn("meds",meds)
        meds.push(medPersist)
        AsyncStorage.setItem("medsListSequence", medId.toString())
        AsyncStorage.setItem('medsList', JSON.stringify(meds))

        navigation.goBack()
    }

    const __medNameField = () => {
        return (
            <>
                <FormFieldLabel>Nome</FormFieldLabel>
                <FormInputTextField
                    onChangeText={ name => setMed({...med , name})}
                    placeholder="Nome do medicamento"
                    value={med.name}    
                />
            </>
        )
    }

    const __medExpireDateField = () => {
        return (
            <>
                <FormFieldLabel>Validade</FormFieldLabel>
                <DatePicker
                    date={med.expireDate}
                    placeholder="Data de validade"
                    onChangeValue={__setExpireDate}    
                />
            </>
        )
    }
    
    const __medStockField = () =>{
        return(
            <>
                <FormFieldLabel>Meu estoque</FormFieldLabel>
                <ViewFlexRow>
                    <FormInputAsLabel
                        onChangeText={ amount => setMed({...med , stock: {...med.stock, amount}})}
                        placeholder="0"
                        value={med.stock.amount}
                        keyboardType="numeric"
                        maxLength={4}></FormInputAsLabel>
                    <UnitSpinner 
                    items={doseUnitsSelection} 
                    value={med.stock.unit}
                    onChangeValue={__updateMedUnit}/> 
                </ViewFlexRow>
            </>
        )
    }

    const __medDosesField = () => {
        return(
            <>
                <ViewFlexRow>
                    <FormFieldLabel>Doses Marcadas</FormFieldLabel>
                    <Switch
                        trackColor={{ false: '#888', true:'#a163ff' }}
                        thumbColor={med.scheduledDoses ? "#63488c" : "#d4d3d4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={ (scheduledDoses) => setMed( {...med, scheduledDoses})}
                        value={med.scheduledDoses}
                    />
                </ViewFlexRow>
                <View>
                    {med.scheduledDoses 
                    ?   <View>
                            <DoseHourItems
                                unit={med.stock.unit}
                                onUpdate={__onUpdateDoseHours}
                            />
                        </View>
                    : <Text>Tomar quando necessário</Text>
                    } 
                </View>
            </>
        )
    }

    const __scheduleField = () =>{
        return(
            <View>
                <FormFieldLabel>Cronograma</FormFieldLabel>
                <FormFieldLabelLight>início</FormFieldLabelLight>
                <DatePicker
                    date={med.startDate}
                    placeholder="Data de início"
                    useNativeDriver={true}
                    onChangeValue={__setTreatmentstartDate}/>
                <FormFieldLabelLight>duração</FormFieldLabelLight>
                    <DurationRadioGroup 
                        onChangeValue={__setDaysSettings}
                    />
                <FormFieldLabelLight>frequência</FormFieldLabelLight>
                    <FrequencyRadioGroup 
                        onChangeValue={__changeFrequencyDays}
                        days={med.weekdays}
                    />
            </View>
        )
    }

    const __iconField = () => {
        return(
            <View>
                <FormFieldLabel>Ícone</FormFieldLabel>
                <IconPicker onChangeIcon={__onIconChange} onChangeColor={__onColorChange}/>
            </View>
        )
    }

    const __obsField = () =>{
        return(
            <View>
                <FormFieldLabel>Observações</FormFieldLabel>
                <LargeFormInputTextField
                    onChangeText={ observacao => setMed({...med , observacao})}
                    value={med.observacao}    
                    maxLength={200}
                    multiline={true}
                    numberOfLines={5}
                />
            </View>
        )
    }

    return (
        <ScrollView>
            <Form>
                <CardBox>
                    <CardContent>
                        {__medNameField()}
                        {__medExpireDateField()}
                    </CardContent>
                </CardBox>
                <CardBox>
                    <CardContent>
                        {__medStockField()}
                    </CardContent>
                </CardBox>
                <CardBox>
                    <CardContent>
                        {__medDosesField()}
                    </CardContent>
                </CardBox>
                {med.scheduledDoses &&
                <CardBox>
                    <CardContent>
                        {__scheduleField()}
                    </CardContent>
                </CardBox>
                }
                <CardBox>
                    <CardContent>
                        {__iconField()}
                    </CardContent>
                </CardBox>
                <CardBox>
                    <CardContent>
                        {__obsField()}
                    </CardContent>
                </CardBox>
                <TouchableOpacity
                    onPress={__onPressSaveButton}>
                    <Button>
                        <ButtonText>
                            Salvar
                        </ButtonText>
                    </Button>
                </TouchableOpacity>
            </Form>
        </ScrollView>
    )

}
