import React, { useState } from 'react'
import { ScrollView, TouchableOpacity, Dimensions} from 'react-native'
import { ToastAndroid , Pressable, View, Alert} from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { createIconSetFromIcoMoon } from 'react-native-vector-icons'
import iconMoonConfig from '../../selection.json'
import { cancelNotification } from '../../util/Notifications'
import {Container, RowView, MedName, HPadding,
    VPadding, InfoTitle, InfoText, Bottom, ButtonView,
    ButtonPurpleText, Button, StockInput} from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'
import 'moment/locale/pt-br'
import doseStatus from '../../constants/doseStatus'
import medStatus from '../../constants/medStatus'
import storageKeys from '../../constants/storageKeys'
import colors from '../../styles/colors'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default props =>{
    
    const {med, screen} = props.route.params
    const [editingStock, setEditingStock] = useState(false)
    const [tempStock, setTempStock] = useState(Math.round(med.stock.amount).toString())
    const MedIcon = createIconSetFromIcoMoon(iconMoonConfig)
    console.log("h: ", windowHeight , "w:", windowWidth )
    
    const __endTreatment = async () =>{        
        var medEnded = {...med}
        var dosesIds = []
        medEnded.doses.forEach(d =>{
            if(d.status != doseStatus.TOMADA || !d.dateTaken){
                d.status = doseStatus.ENCERRADA
                dosesIds.push(d.id)
            }
        })
        medEnded.status = medStatus.INATIVO;
        cancelNotification(dosesIds)
        const medsString = await AsyncStorage.getItem(storageKeys.MEDS)
        var meds = medsString !== null ? JSON.parse(medsString) : []
        var meds = meds.map( m => m.name == medEnded.name ? medEnded : m)
        AsyncStorage.setItem(storageKeys.MEDS, JSON.stringify(meds))
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
        }])
    }

    const updateStock = async (amount) =>{
        updatedMed = {...med}
        updatedMed.stock.amount = amount

        const medsString = await AsyncStorage.getItem(storageKeys.MEDS)
        var meds = medsString !== null ? JSON.parse(medsString) : []
        var meds = meds.map( m => m.name == updatedMed.name && m.id == updatedMed.id ? updatedMed : m)
        AsyncStorage.setItem(storageKeys.MEDS, JSON.stringify(meds))
        ToastAndroid.showWithGravityAndOffset("Estoque atualizado!",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
        0, 180)
    }

    const confirmStockChange = () =>{
        if( + tempStock <= 0){
            ToastAndroid.showWithGravityAndOffset("Por favor insira um valor acima de zero.",
            ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 180)
            return
        }
        let stock = tempStock.replace(/^0+/, '')

        setEditingStock(false)
        setTempStock(stock)
        updateStock(stock)
    }

    const cancelStockChange = () =>{
        setTempStock(med.stock.amount.toString())
        setEditingStock(false)
    }

    const __getStockContent = () =>{
        let editableStyle = {
            color: colors.primary,
            borderColor: colors.grey8,
            borderRadius: 5,
            borderWidth: 1,
            marginRight: 6,
            textAlign: 'center'
        } 
        return(
            <>
            <InfoTitle>Estoque</InfoTitle>
            <RowView>
                <StockInput
                    value={tempStock}
                    keyboardType="numeric"
                    editable={editingStock}
                    placeholderTextColor="red"
                    maxLength={4}
                    textAlign="right"
                    style={[editingStock ? editableStyle : {}]}
                    onChangeText={(stock) => setTempStock(stock.replace(/[^0-9]/g, ''))}>

                </StockInput>
                <InfoText>
                    {med.stock.unit.label}(s)
                </InfoText>
                {editingStock  ? 
                <RowView>
                    <TouchableOpacity onPress={confirmStockChange}>
                        <HPadding>
                            <Icon name="check" type="font-awesome" size={26} color={colors.ok}/>
                        </HPadding>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={cancelStockChange}>
                        <HPadding>
                            <Icon name="close" type="font-awesome" size={26} color={colors.alert}/>
                        </HPadding>
                    </TouchableOpacity>
                </RowView>
                :
                <TouchableOpacity onPress={() => setEditingStock(true)}>
                    <HPadding>
                        <Icon name="pencil" type="material-community" size={26} color={colors.primary}/>
                    </HPadding>
                </TouchableOpacity>
                }
            </RowView>
            {med.stock.unit.liquid &&
                <InfoText>
                    {"   aproximadamente"}
            </InfoText>}
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
            if(med.totalDays > 0 && untakenDoses > 0){
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
        return med.doseHours.map( d =>{
            var time = moment(d.time).format("HH:mm")
            var unitLabel =  med.doseUnit.label + (d.amount > 1 ? "s" : "")
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
        <ScrollView keyboardShouldPersistTaps={'handled'}>
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
                                <Icon name="new" type="entypo" size={30} color={colors.notification}/>
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
                    <VPadding>
                        <InfoText>{moment(med.expireDate).format("L")}</InfoText>
                    </VPadding>
                </VPadding>}
                {med.notes &&
                <VPadding>
                    <InfoTitle>Notas</InfoTitle>
                    <VPadding>
                        <InfoText>{med.notes}</InfoText>
                    </VPadding>
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
            </Container>
        </ScrollView>
    )
}