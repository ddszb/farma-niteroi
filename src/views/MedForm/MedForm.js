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
import AutoCompleteInput from '../../components/AutoCompleteInput'
import medicons from '../../constants/medicons'
import iconColors from '../../constants/iconColors'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import meds_niteroi from '../../data/meds_niteroi'
import { FormFieldLabel, LargeFormInputTextField, FormFieldLabelLight,
    ViewFlexRow, CardBox, CardContent, ButtonText, Button, Form, FormInputAsLabel, DatePickerText} from './styles'
import IconPicker from './components/IconPicker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DateTimePicker from '@react-native-community/datetimepicker'

import doseStatus from '../../constants/doseStatus'
import medStatus from '../../constants/medStatus'

import moment from 'moment'
import 'moment/locale/pt-br'
import storageKeys from '../../constants/storageKeys'
import doseUnits from '../../constants/doseUnits'


const initialDoseTime = new Date();
initialDoseTime.setHours(8)
initialDoseTime.setMinutes(0)
const initialState = 
    {
        name:'',
        weekdays: { 0:1, 1:1, 2:1, 3:1, 4:1, 5:1, 6:1},
        days: 7,
        startDate: new Date(),
        expireDate: new Date(),
        scheduledDoses: false,
        icon: medicons[0],
        iconColor: iconColors[0],
        notes: null,
        status: medStatus.ATIVO,
        doseUnit: doseUnits[0],
        doseHours: [{ time: initialDoseTime, amount: 1, unit: doseUnits[0], index: 0}],
        stock:{
            amount: null,
            unit: doseUnits[0]
        },
        doses:[]
    }


export default ({navigation, route}) => {

    const autoCompleteOptions = meds_niteroi.map((med, index )=> ({key: index, value: med.nome + " " + med.dosagem}))
            .sort((a, b) => a.value.toLowerCase() > b.value.toLowerCase() ? 1 : -1)
    const [med, setMed] = useState(initialState)
    const [medPicked, setMedPicked] = useState(false)
    const [showExpireDatePicker, setShowExpireDatePicker] = useState(false)
    
    const medUnits = doseUnits.filter( u => !u.doseOnly)
    const liquidDoseUnits = doseUnits.filter( u => u.liquid)

    const __onColorChange = (color) =>{
        setMed({...med, iconColor: color})
    }
    const __onIconChange = (icon) =>{
        setMed({...med, icon: icon})
    }
    
    const __setTreatmentstartDate = (date) =>{
        let startDate = new Date(date)
        startDate.setHours(0)
        startDate.setMinutes(0)
        setMed({...med, startDate})
    }
    
    /**
     * Atualiza informações da unidade das doses de um medicamento
     * @param {doseUnit} unit 
     */
     const changeDoseUnit = (doseUnit) =>{
        setMed({...med, doseUnit})
    }

    const __updateMedUnit = (unit) =>{
        setMed({...med, stock:{...med.stock, unit}, doseUnit: unit})
    }

    const __changeFrequencyDays = (weekdays) =>{
        if(__getTimesAWeek(weekdays) == 0){
            return
        }
        setMed({...med, weekdays})
    }

    
    const __validateNewMed = async () =>{
        var invalid = false
        var errors  = []
        if(!med.name){
            invalid = true
            errors.push("Nome de medicamento obrigatório")
        }else{
            const medsString = await AsyncStorage.getItem(storageKeys.MEDS)
            const meds = medsString !== null ? JSON.parse(medsString) : []
            if(meds.map(m => m.name).includes(med.name)){
                invalid = true
                errors.push("Você já cadastrou um medicamento com esse nome.")
            }
        }
        
        if(!med.stock.amount || med.stock.amount <= 0){
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

    const __onPressSaveButton = async () =>{
        var isValid = await __validateNewMed()
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
        medPersist = __fillMedInfo(medPersist)
        const medsString = await AsyncStorage.getItem(storageKeys.MEDS)
        const meds = medsString !== null ? JSON.parse(medsString) : []
        
        const medSequence = await AsyncStorage.getItem(storageKeys.MED_SEQUENCE)
        const medId = medSequence !== null ? parseInt(medSequence) + 1 : 1
        medPersist.id = medId
        
        meds.push(medPersist)
        AsyncStorage.setItem(storageKeys.MED_SEQUENCE, medId.toString())
        AsyncStorage.setItem(storageKeys.MEDS, JSON.stringify(meds))

        navigation.goBack()
    }

    const __onPressNextButton = () =>{
        if(med.name){
            setMedPicked(true)
        }
    }

    const onPressReset = () =>{
        Alert.alert('Limpar dados', 'Deseja limpar as informações preenchidas?',
        [{text: 'Não'},
        {text:'Sim',
         onPress(){
             resetMed()
        }}])
    }
    const resetMed = () =>{
        setMedPicked(false)
        setShowExpireDatePicker(false)
        setMed(initialState)
    }

    const __medNameField = () => {
        return (
            <CardBox>
                <CardContent>
                    <FormFieldLabel>Nome</FormFieldLabel>
                    <ViewFlexRow>
                    <AutoCompleteInput
                        editable={!medPicked}
                        data={autoCompleteOptions}
                        onChange={ name => setMed({...med , name})}
                        placeholder="Nome do medicamento"
                        value={med.name}
                        styles={{width: 300}}
                    />
                    {medPicked &&
                    <TouchableOpacity onPress={onPressReset}>
                        <Icon name={"eraser"} type={"font-awesome-5"} size={25} color={'#63488c'}/>
                    </TouchableOpacity>}
                    </ViewFlexRow>
                </CardContent>
            </CardBox>
        )
    }

    const __nextButton = () =>{
        if(!medPicked){
            return(
                <TouchableOpacity
                        onPress={__onPressNextButton}>
                        <Button>
                            <ButtonText>
                                Próximo
                            </ButtonText>
                        </Button>
                </TouchableOpacity>
            )
        }
    }
    const __medExpireDateField = () => {

        let minimumDate = new Date()
        let datePicker = <DateTimePicker 
            value={med.expireDate}
            minimumDate={minimumDate}
            onChange={ (_, date) =>{
                setShowExpireDatePicker(false)
                setMed({...med, expireDate: date})
            }}
            mode="date"/>

        var dateString = moment(med.expireDate).format('DD/MM/YYYY')
        
        return (
            <CardBox>
                <CardContent>
                    <FormFieldLabel>Validade</FormFieldLabel>
                    <TouchableOpacity
                        onPress={ () => setShowExpireDatePicker(true)}>
                        <DatePickerText>
                            {dateString}
                        </DatePickerText>
                    </TouchableOpacity>
                    {showExpireDatePicker && datePicker}
                </CardContent>
            </CardBox>
        )
    }
    
    const __medStockField = () =>{
        return(
            <>
            <CardBox>
                <CardContent>
                    <FormFieldLabel>Meu estoque</FormFieldLabel>
                    <ViewFlexRow>
                        <FormInputAsLabel
                            onChangeText={ amount => setMed({...med , stock: {...med.stock, amount}})}
                            placeholder="0"
                            placeholderTextColor="#666" 
                            value={med.stock.amount}
                            keyboardType="numeric"
                            maxLength={4}></FormInputAsLabel>
                        <UnitSpinner 
                        items={medUnits} 
                        value={med.stock.unit}
                        styles={{width: '85%'}}
                        onChangeValue={__updateMedUnit}/> 
                    </ViewFlexRow>
                </CardContent>
            </CardBox>
            {med.doseUnit.liquid &&
            <CardBox>
                <CardContent>
                    <FormFieldLabel>Tipo da dose</FormFieldLabel>
                    <UnitSpinner items={liquidDoseUnits} onChangeValue={changeDoseUnit}/> 
                </CardContent>
            </CardBox>
            }
            </>           
        )
    }

    const __medDosesField = () => {
        return(
            <CardBox>
                <CardContent>
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
                                    unit={med.doseUnit}
                                    onUpdate={__onUpdateDoseHours}
                                />
                            </View>
                        : <Text>Tomar quando necessário</Text>
                        } 
                    </View>
                </CardContent>
            </CardBox>
        )
    }

    const __scheduleField = () =>{
        if (med.scheduledDoses){
            return(
                <CardBox>
                    <CardContent>
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
                                    onChangeDays={__changeFrequencyDays}
                                    days={med.weekdays}
                                />
                        </View>
                    </CardContent>
                </CardBox>
            )
        }
    }

    const __iconField = () => {
        return(
            <CardBox>
                <CardContent>
                    <View>
                        <FormFieldLabel>Ícone</FormFieldLabel>
                        <IconPicker onChangeIcon={__onIconChange} onChangeColor={__onColorChange}/>
                    </View>
                </CardContent>
            </CardBox>
        )
    }

    const __obsField = () =>{
        return(
            <CardBox>
                <CardContent>
                    <View>
                        <FormFieldLabel>Observações</FormFieldLabel>
                        <LargeFormInputTextField
                            onChangeText={ notes => setMed({...med , notes})}
                            value={med.notes}    
                            maxLength={200}
                            multiline={true}
                            numberOfLines={5}
                        />
                    </View>
                </CardContent>
            </CardBox>
        )
    }

    const __saveButton = () =>{
        return(
            <TouchableOpacity
                    onPress={__onPressSaveButton}>
                    <Button>
                        <ButtonText>
                            Salvar
                        </ButtonText>
                    </Button>
            </TouchableOpacity>
        )
    }


    return (
        <Form>
                {__medNameField()}
                {__nextButton()}
            <ScrollView keyboardShouldPersistTaps={'handled'}>
                {medPicked &&
                <>
                    {__medExpireDateField()}
                    {__medStockField()}
                    {__medDosesField()}
                    {__scheduleField()}
                    {__iconField()}
                    {__obsField()}
                    {__saveButton()}
                </>}
            </ScrollView>
            </Form>
    )

}
''