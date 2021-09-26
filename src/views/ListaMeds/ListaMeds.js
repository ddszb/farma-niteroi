import React, {useState, useEffect} from 'react'
import {FlatList, TouchableOpacity, ToastAndroid} from 'react-native'
import { ListItem } from 'react-native-elements'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { createIconSetFromIcoMoon } from 'react-native-vector-icons'
import iconMoonConfig from '../../selection.json'
import {LeftTitle, RightTitle, LeftSubtitle, RightSubtitle, RightContainer,
     MedListView, IconPadding, HeaderTitle, HeaderTitleText, ToggleView, EmptyListContainer, LightText, FooterButton, FooterButtonText, ListView, ButtonView} from './styles'
import {useFocusEffect} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import medStatus from '../../constants/medStatus'
import doseStatus from '../../constants/doseStatus'
import storageKeys from '../../constants/storageKeys'
import colors from '../../styles/colors'


export default props =>{
    
    
    const [showFinishedMeds, setShowFinishedMeds] = useState(true)
    const [meds, setMeds] = useState([])
    const [visibleMeds, setVisibleMeds] = useState([])
    const MedIcon = createIconSetFromIcoMoon(iconMoonConfig)

    const getMeds = async () =>{
        const medsString = await AsyncStorage.getItem(storageKeys.MEDS)
        const meds = JSON.parse(medsString) || []
        setMeds(meds)
    }

    useFocusEffect(
        React.useCallback(() =>{
        getMeds()
    }, []))

    useEffect(() =>{
        if(meds && meds.length > 0){
            filterMeds()
        }
    }, [meds, showFinishedMeds])
    
    const filterMeds = () =>{
        var allMeds = [...meds]
        if(!showFinishedMeds){
            allMeds = meds.filter( m => m.status == medStatus.ATIVO)
        }
        allMeds.sort((a,b) => a.status < b.status)
        setVisibleMeds(allMeds)
    }

    const toggleFilter = () =>{
        var toastMessage = showFinishedMeds ? "Ocultando medicamentos finalizados" : "Exibindo medicamentos finalizados"
        ToastAndroid.showWithGravityAndOffset(toastMessage,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM, 0 , 120)
        setShowFinishedMeds(!showFinishedMeds)
    }

    function navigateToNew(){
        props.navigation.navigate('Adicionar Medicamento', {screen: 'Adicionar Medicamento'})
    }

    function navigateToView(med){
        props.navigation.navigate('Meu Medicamento', {screen: 'Meu Medicamento', med: med} )
    }


    const getMedsList = () =>{
        if(visibleMeds.length == 0){
            return(
                <EmptyListContainer>
                    <LightText>
                        {'Nenhum medicamento adicionado!\n'}
                    </LightText>
                    <LightText>
                        {'Toque no botão abaixo para adicionar um novo\nmedicamento à sua farmácia pessoal.'}
                    </LightText>
                </EmptyListContainer>
            )
        }else{
            return(
                <FlatList
                    keyExtractor={ (item, index) => `${index}`}
                    data={visibleMeds}
                    renderItem={getMedItem}
                />
            )
        }
    }

    const __getRightContent = (med) =>{
        if(med.status == medStatus.INATIVO){
            return(
                <>
                    <RightSubtitle>
                        Tratamento Encerrado
                    </RightSubtitle>
                </>)
        }
        if(med.scheduledDoses){
            if(med.days > 0 && med.doses && med.doses.length > 0){
                var dosesLeft = med.doses.filter(d => d.status == doseStatus.NAO_TOMADA || d.status == doseStatus.ADIADA).length
                return(
                <>
                    <RightTitle style={{color: med.iconColor}}>
                    {dosesLeft} {dosesLeft > 1 ? 'doses' : 'dose'}
                    </RightTitle>
                    <RightSubtitle>
                        {dosesLeft > 1 ? 'restantes' : 'restante'}
                    </RightSubtitle>
                </>)
            }else{
                return(
                    <RightSubtitle>
                        {"Tratamento contínuo"}
                    </RightSubtitle>
                )
            }

        }else{
            return(
                <RightSubtitle>
                    {"Quando\n necessário"}
                </RightSubtitle>
            )
        }
    }

    function getMedItem({ item: med }){
        let stockLabel = (med.stock.unit.liquid ? "~" : "") + Math.round(med.stock.amount) + " " + med.stock.unit.label + (med.stock.amount > 1 ? 's' : '')
        return (
            <ListItem 
                key={med.id.toString()}
                bottomDivider
                onPress={() => navigateToView(med)}>
                <IconPadding>
                    <MedIcon name={med.icon} size={40} color={med.iconColor}/> 
                </IconPadding>
                {/* Nome e quantidade */}
                <ListItem.Content>
                    <LeftTitle numberOfLines={1} style={{color: med.iconColor}}>
                        {med.name}
                    </LeftTitle>
                    <LeftSubtitle>
                        {stockLabel}
                    </LeftSubtitle>
                </ListItem.Content>
                {/* Tempo restante */}
                <RightContainer>
                    {__getRightContent(med)}
                </RightContainer>
            </ListItem>
                
        )
    }
    
    return (
        <MedListView>
            <ListView>
            <HeaderTitle>
                <HeaderTitleText>
                    Meus Medicamentos
                </HeaderTitleText>
                <ToggleView>
                    <TouchableOpacity onPress={toggleFilter}> 
                        <Icon 
                            name={"filter"}
                            type={"material-community"}
                            size={32}
                            color={colors.primary}/>
                    </TouchableOpacity>
                </ToggleView>
            </HeaderTitle>
            {getMedsList()}
            </ListView>
            <ButtonView>
            <FooterButton
                onPress={navigateToNew}
                activeOpacity={0.9}>
                <FooterButtonText>
                    Novo Medicamento
                </FooterButtonText>
            </FooterButton>
            </ButtonView>
        </MedListView>
        
    )
}

