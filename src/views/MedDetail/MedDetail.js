import React from 'react'
import { TouchableOpacity } from 'react-native'
import { ToastAndroid , Pressable, View, Alert} from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { createIconSetFromIcoMoon } from 'react-native-vector-icons'
import iconMoonConfig from '../../selection.json'
import {Container, RowView, MedName, HPadding,
    VPadding, InfoTitle, InfoText, Bottom, ButtonView,
    RightButtonText, LeftButtonText, Button} from './styles'
import doseUnits from '../../constants/doseUnits'
import * as UtilitarioCalculo from '../../util/UtilitarioCalculo'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'
import 'moment/locale/pt-br'
import doseStatus from '../../constants/doseStatus'
import medStatus from '../../constants/medStatus'

export default props =>{
    
    const {med, screen} = props.route.params
    const MedIcon = createIconSetFromIcoMoon(iconMoonConfig)


    const __endTreatment = async () =>{        
        console.warn(Object.keys(screen))
        var medEnded = {...med}
        medEnded.doses.forEach(d =>{
            if(d.status != doseStatus.TOMADA || !d.dateTaken){
                d.status = doseStatus.ENCERRADA
            }
        })
        medEnded.status = medStatus.INATIVO;

        const medsString = await AsyncStorage.getItem('medsList')
        var meds = medsString !== null ? JSON.parse(medsString) : []
        var meds = meds.map( m => m.name == medEnded.name ? medEnded : m)
        AsyncStorage.setItem('medsList', JSON.stringify(meds))
        console.log(JSON.stringify(meds,0, 2))
        props.navigation.goBack()
        
    }

    const __onPressEndTreatment = () =>{
        var mensagemConfirmacao = "Deseja encerrar o tratamento?"
        if (med.doses && med.doses.length > 0){
            mensagemConfirmacao += " Todas as doses não tomadas serão removidas."
        }
         
        Alert.alert('Encerrar tratamento', mensagemConfirmacao,
            [{   
                text: 'Não',
            },
            {
                text:'Sim',
                onPress(){
                    __endTreatment()
                }
            },
        ])
    }

    const __getTimeContent = () => {
        if(med.status == medStatus.INATIVO){
            return(
                <>
                    <InfoTitle>
                        Tratamento Encerrado
                    </InfoTitle>
                </>)
        }
        
        if(med.scheduledDoses){
            if(med.days > 0 && med.startDate && med.endDate){
                var daysLeft = UtilitarioCalculo.diffDays(new Date(), med.endDate)
                return(
                <>
                    <InfoTitle>
                        Duração
                    </InfoTitle>
                    <InfoText>
                        {daysLeft} {daysLeft > 1 ? 'dias ' : 'dia '}
                        {daysLeft > 1 ? 'restantes' : 'restante'}
                    </InfoText>
                </>)
            }else{
                return(
                    <>
                        <InfoTitle>
                            Duração
                        </InfoTitle>
                        <InfoText>
                            {"Tratamento contínuo"}
                        </InfoText>
                    </>
                )
            }
        }else{
            return(
                <>
                    <InfoTitle>
                        Duração
                    </InfoTitle>
                    <InfoText>
                        {"Tomar quando necessário"}
                    </InfoText>
                </>
            )
        }
    }

    __getDoseHoursContent = () => {
        return med.doseHours.map( d =>{
            var time = moment(d.time).format("HH:mm")
            var unitLabel =  doseUnits[d.unit].label + (d.amount > 1 ? "s" : "")
            return(
                <RowView key={d.index}>
                    <InfoTitle>
                        {time}
                    </InfoTitle>
                    <HPadding>
                        <InfoText>Tomar {d.amount} {unitLabel}</InfoText>
                    </HPadding>
                </RowView>
            )
        })
    }

    __getFrequencyContent = () => {
        var weekdays = { 0: "dom", 1: "seg", 2: "ter", 3: "qua", 4: "qui", 5: "sex", 6: "sab"}
        var intakes = []
        Object.keys(med.weekdays).forEach( d =>{
            if(med.weekdays[d] == 1){
                intakes.push(weekdays[d])
            }
        })
        return intakes.map( i =>{
            return(
                <View key={i}>
                    <InfoText>{i}  </InfoText>
                </View>
            )
        })
    }

    return (
        <Container>
            <VPadding>
                <RowView>
                    <MedIcon name={med.icon} size={40} color={med.iconColor}/> 
                    <HPadding>
                        <MedName style={{color: med.iconColor}}>{med.name}</MedName>
                    </HPadding>
                    {med.isOffered &&
                    <HPadding>
                        <Pressable
                            onPress={ () => {
                                ToastAndroid.showWithGravityAndOffset("Este medicamento é oferecido pela prefeitura de niterói!",
                                ToastAndroid.SHORT,
                                ToastAndroid.TOP,
                                0, 180)
                            }}>
                            <Icon name="new" type="entypo" size={30} color="#eb6134"/>
                        </Pressable>
                    </HPadding>}
                    
                </RowView>
            </VPadding>
            <VPadding>
                {__getTimeContent()}
            </VPadding>
            <VPadding>
                <InfoTitle>Estoque</InfoTitle>
                <InfoText>{med.stock.amount} {med.stock.unit.label}(s)</InfoText>
            </VPadding>
            {med.scheduledDoses && med.doseHours &&
            <VPadding>
                <InfoTitle>Horários</InfoTitle>
                {__getDoseHoursContent()}
            </VPadding>}
            {med.scheduledDoses && 
            <VPadding>
                <InfoTitle>Frequência</InfoTitle>
                <VPadding>
                    <RowView>
                        {__getFrequencyContent()}
                    </RowView>
                </VPadding>
            </VPadding>}
            {med.expireDate &&
            <VPadding>
                <InfoTitle>Validade</InfoTitle>
                <InfoText>{moment(med.expireDate).format("L")}</InfoText>
            </VPadding>}
            {med.notes &&
            <VPadding>
                <InfoTitle>Notas</InfoTitle>
                <InfoText>{med.notes}</InfoText>
            </VPadding>}
            <Bottom>
                <ButtonView>
                    {med.status == medStatus.ATIVO && 
                    <TouchableOpacity
                        onPress={__onPressEndTreatment}>
                        <Button>
                            <RightButtonText>
                                Encerrar Tratamento
                            </RightButtonText>
                        </Button>
                    </TouchableOpacity>}
                </ButtonView>
            </Bottom>
        </Container>
    )
}