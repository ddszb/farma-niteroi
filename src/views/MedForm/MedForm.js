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
import { FormFieldLabel, FormInputTextField, FormFieldLabelLight,
    ViewFlexRow, CardBox, CardContent, Form} from './styles'


export default ({navigation, route}) => {

    // console.warn(Object.keys(route))
    
    const [med, setMed] = useState(route.params ? route.params : {})

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
                        thumbColor={med.scheduledDoses ? "#6f11fd" : "#d4d3d4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={ (scheduledDoses) => setMed( {...med, scheduledDoses})}
                        value={med.scheduledDoses}
                    />
                </ViewFlexRow>
                <View>
                    {med.scheduledDoses 
                    ?   <View>
                            <DoseHourItems key="index"/>
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

    const scheduleField = (value) =>{
        
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
            </Form>
        </ScrollView>
    )

    
}
