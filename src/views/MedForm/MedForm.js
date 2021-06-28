import React, { useContext, useState } from 'react'
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
import AppContext from '../../context/context'
import DatePicker from '../../components/DatePicker'
import DoseHourItems from './components/DoseHourItems'
import DurationRadioGroup from './components/DurationRadioGroup'
import FrequencyRadioGroup from './components/FrequencyRadioGroup'
import actionTypes from '../../constants/actionTypes'
import { FormFieldLabel, FormInputTextField, LargeFormInputTextField, FormFieldLabelLight,
    ViewFlexRow, CardBox, CardContent, ButtonText, Button, Form} from './styles'
import IconPicker from './components/IconPicker'


export default ({navigation, route}) => {

    // console.warn(Object.keys(route))
    
    const [med, setMed] = useState(
        route.params ? route.params : 
            {
                days: { 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 0:0}
            })


    const { dispatch } = useContext(AppContext)

    
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
    
    const __changeFrequencyDays = (days, isDaily) =>{
        if(isDaily){
            days = { 1:1, 2:1, 3:1, 4:1, 5:1, 6:1, 0:1}
        }
        setMed({...med, days})
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
    
    const __confirmSave = () =>{
        if(med.expireDate){
            var expireDate = UtilitarioFormatacao.parseDateToStr(med.expireDate)
        }
        if(med.startDate){
            var startDate = UtilitarioFormatacao.parseDateToStr(med.startDate)
        }
        setMed({...med, expireDate, startDate})
        
        dispatch({
            type: actionTypes.CREATE_MED,
            payload: med,
        })

        navigation.goBack()
    }

    const __medNameField = () => {
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
                            <DoseHourItems/>
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
                    <DurationRadioGroup/>
                <FormFieldLabelLight>frequência</FormFieldLabelLight>
                    <FrequencyRadioGroup 
                        onChangeValue={__changeFrequencyDays}
                        days={med.days}
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
