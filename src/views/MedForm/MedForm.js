import React, { useContext, useState } from 'react'
import {
    Text,
    View,
    Switch,
    ScrollView
} from "react-native"

import AppContext from '../../context/context'
import DatePicker from '../../components/DatePicker'
import DoseHourItems from './components/DoseHourItems'
import DurationRadioGroup from './components/DurationRadioGroup'
import FrequencyRadioGroup from './components/FrequencyRadioGroup'
import { FormFieldLabel, FormInputTextField, FormFieldLabelLight,
    ViewFlexRow, CardBox, CardContent, Form} from './styles'
import IconPicker from './components/IconPicker'


export default ({navigation, route}) => {

    // console.warn(Object.keys(route))
    
    const [med, setMed] = useState(
        route.params ? route.params : 
            {
                days: { 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 0:0}
            })


    const { dispatch } = useContext(AppContext)

    const medNameField = () => {
        return (
            <>
                <FormFieldLabel>Nome</FormFieldLabel>
                <FormInputTextField
                    onChangeText={ name => setMed({...med , name})}
                    placeholder="Nome do usuário"
                    value={med.name}    
                />
            </>
        )
    }

    const setExpireDate = (expireDate) =>{
        setMed({...med, expireDate})
    }

    const onColorChange = (color) =>{
        setMed({...med, iconColor: color})
    }
    const onIconChange = (icon) =>{
        setMed({...med, icon: icon})
    }
    

    const medExpireDateField = () => {
        return (
            <>
                <FormFieldLabel>Validade</FormFieldLabel>
                <DatePicker
                    date={med.expireDate}
                    placeholder="Data de validade"
                    onChangeValue={setExpireDate}    
                />
            </>
        )
    }

    const medDosesField = () => {

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
                            <DoseHourItems/>
                        </View>
                    : <Text>Tomar quando necessário</Text>
                    } 
                </View>
                
                
            </>
        )
    }

    const setTreatmentStartTime = (startTime) =>{
        setMed({...med, startTime})
    }

    const changeFrequencyDays = (days, isDaily) =>{
        if(isDaily){
            days = { 1:1, 2:1, 3:1, 4:1, 5:1, 6:1, 0:1}
        }
        setMed({...med, days})
    }

    const scheduleField = () =>{
        return(
            <View>
                <FormFieldLabel>Cronograma</FormFieldLabel>
                <FormFieldLabelLight>início</FormFieldLabelLight>
                <DatePicker
                    date={med.startTime}
                    placeholder="Data de início"
                    onChangeValue={setTreatmentStartTime}/>
                <FormFieldLabelLight>duração</FormFieldLabelLight>
                    <DurationRadioGroup/>
                <FormFieldLabelLight>frequência</FormFieldLabelLight>
                    <FrequencyRadioGroup 
                        onChangeValue={changeFrequencyDays}
                        days={med.days}
                    />
            </View>
        )
    }

    const iconField = () => {
        return(
            <View>
                <FormFieldLabel>Ícone</FormFieldLabel>
                <IconPicker onChangeIcon={onIconChange} onChangeColor={onColorChange}/>
            </View>
        )
    }


    return (
        <ScrollView>
            <Form>
                <CardBox>
                    <CardContent>
                        {medNameField()}
                        {medExpireDateField()}
                    </CardContent>
                </CardBox>
                <CardBox>
                    <CardContent>
                        {medDosesField()}
                    </CardContent>
                </CardBox>
                <CardBox>
                    <CardContent>
                        {scheduleField()}
                    </CardContent>
                </CardBox>
                <CardBox>
                    <CardContent>
                        {iconField()}
                    </CardContent>
                </CardBox>
            </Form>
        </ScrollView>
    )

    
}
