import React, { useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { ToastAndroid , Pressable, View, Alert, Modal} from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { createIconSetFromIcoMoon } from 'react-native-vector-icons'
import iconMoonConfig from '../../selection.json'
import {Container, RowView, MedName, HPadding,
    VPadding, InfoTitle, InfoText, Bottom, ButtonView,
    ButtonPurpleText, ButtonBlueText, Button} from './styles'
import doseUnits from '../../constants/doseUnits'
import * as UtilitarioCalculo from '../../util/UtilitarioCalculo'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'
import 'moment/locale/pt-br'
import doseStatus from '../../constants/doseStatus'
import medStatus from '../../constants/medStatus'
import InputModal from '../../components/InputModal'

export default props =>{
    
    const {med, screen} = props.route.params
    const [modalVisible, setModalVisible] = useState(false)
    const MedIcon = createIconSetFromIcoMoon(iconMoonConfig)

    
    const __endTreatment = async () =>{        
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

    const __addStock = async (amount) =>{
        
        updatedMed = {...med}
        updatedMed.stock.amount = +updatedMed.stock.amount + +amount

        const medsString = await AsyncStorage.getItem('medsList')
        var meds = medsString !== null ? JSON.parse(medsString) : []
        var meds = meds.map( m => m.name == updatedMed.name ? updatedMed : m)
        AsyncStorage.setItem('medsList', JSON.stringify(meds))
        ToastAndroid.showWithGravityAndOffset(med.stock.unit.label + "s adicionados ao estoque",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
        0, 180)
        setModalVisible(false)
    }

    const getModal = () =>{
        return (
            <InputModal
                visible={modalVisible}
                title={"Repor estoque"}
                subtitle={"Quanto adicionar ao estoque?"}
                inputType={"numeric"}
                inputText={med.stock.unit.label + "s"}
                inputLength={4}
                close={ () => setModalVisible(false)}
                onSet={__addStock}
                confirmText={"Adicionar"}
            />
        )
    }

    const __getStockContent = () =>{
        return(
            <>
                    <InfoTitle>Estoque</InfoTitle>
                    <RowView style={{marginLeft: 60}}>
                        <InfoText>{med.stock.amount} {med.stock.unit.label}(s)</InfoText>
                        <TouchableOpacity
                                onPress={() => setModalVisible(true)}>
                                <Button>
                                    <ButtonBlueText>
                                        Repor
                                    </ButtonBlueText>
                                </Button>
                        </TouchableOpacity>
                    </RowView>
                </>
            )
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
            untakenDoses = med.doses.filter(d => d.status == doseStatus.ADIADA || d.status == doseStatus.NAO_TOMADA).length
            if(med.days > 0 && untakenDoses > 0){
                return(
                <>
                    <InfoTitle>
                        Duração
                    </InfoTitle>
                    <InfoText>
                        {untakenDoses} {untakenDoses > 1 ? 'doses ' : 'dose '}
                        {untakenDoses > 1 ? 'restantes' : 'restante'}
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
        console.log(med.doseHours)
        return med.doseHours.map( d =>{
            var time = moment(d.time).format("HH:mm")
            var unitLabel =  d.unit.label + (d.amount > 1 ? "s" : "")
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
        <ScrollView>

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
                    {__getStockContent()}
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
                                <ButtonPurpleText>
                                    Encerrar Tratamento
                                </ButtonPurpleText>
                            </Button>
                        </TouchableOpacity>}
                    </ButtonView>
                </Bottom>
                {getModal()}
            </Container>
        </ScrollView>
    )
}