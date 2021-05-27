import React, { useContext, useState } from 'react'
import {
    Text,
    StyleSheet,
    TextInput,
    View,
    Switch,
    TouchableOpacity
} from "react-native"

import AppContext from '../context/context'
import DatePicker from '../components/DatePicker'
import doseUnits from '../constants/doseUnits'
import DoseHourDialog from '../components/DoseHourDialog'
import DoseHourItems from '../components/DoseHourItems'

export default ({navigation, route}) => {

    // console.warn(Object.keys(route))
    
    const [med, setMed] = useState(route.params ? route.params : {})

    const { dispatch } = useContext(AppContext)

    const medNameField = () => {
        return (
            <>
                <Text style={style.label}>Nome</Text>
                <TextInput
                    style={style.input}
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
                <Text style={style.label}>Validade</Text>
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
                <View style={{flexDirection: 'row'}}>
                    <Text style={style.label}>Doses Marcadas</Text>
                    <Switch
                        trackColor={{ false: '#888', true:'#a163ff' }}
                        thumbColor={med.scheduledDoses ? "#6f11fd" : "#d4d3d4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={ (scheduledDoses) => setMed( {...med, scheduledDoses})}
                        value={med.scheduledDoses}
                    />
                </View>
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

    const scheduleField = (value) =>{
        
        return(
            <View>
                <Text style={style.label}>Cronograma</Text>
                <Text style={style.lightText}>início</Text>
                <View style={{paddingLeft: 6}}>
                    <DatePicker
                        date={med.startTime}
                        placeholder="Data de início"
                        onChangeValue={setTreatmentStartTime}/>
                </View>
                <Text style={style.lightText}>duração</Text>


            </View>
        )
    }

    return (
        <View style={style.form}>
            <View style={style.card}>
                <View style={style.cardContent}>
                    {medNameField()}
                    {medExpireDateField()}
                </View>
            </View>
            <View style={style.card}>
                <View style={style.cardContent}>
                    {medDosesField()}
                </View>
            </View>
            <View style={style.card}>
                <View style={style.cardContent}>
                    {scheduleField()}
                </View>
            </View>
        </View>
    )

    
}


const style = StyleSheet.create({
    form:{
        flex: 1,
        padding: 15
    },
    field:{
        padding: 6,
    },
    card:{
        backgroundColor: '#eaeaea',
        borderRightColor: '#bbb',
        borderBottomColor: '#bbb',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderRadius: 5,
        marginBottom: 12,
    },
    cardContent:{
        padding: 15,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        color:'#444',
        borderRadius: 5,
        borderWidth: 1,
        marginBottom: 10,
        marginTop: 5,
        padding: 10
    },
    lightText:{
        color:'#666',
        paddingTop: 6,
        paddingBottom: 6,
    },
    label:{
        color: '#6f11fd',
        fontWeight: 'bold'
        
    }
})