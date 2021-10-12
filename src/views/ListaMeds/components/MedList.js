import React from 'react'
//Libs e Hooks
import { FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'
import { createIconSetFromIcoMoon } from 'react-native-vector-icons'
import iconMoonConfig from '../../../selection.json'
// Enums
import doseStatus from '../../../constants/doseStatus'
import medStatus from '../../../constants/medStatus'
//Estilos
import { EmptyListContainer, IconPadding, LeftSubtitle, LeftTitle, LightText, RightContainer, RightSubtitle, RightTitle } from '../styles'

/**
 * Componente para renderização da lista de medicamentos da tela "Medicamento"
 */
export default props =>{

    const NO_MEDS_TEXT = 'Nenhum medicamento adicionado!\n\nToque no botão abaixo para adicionar um novo\nmedicamento à sua farmácia pessoal.'

    const MedIcon = createIconSetFromIcoMoon(iconMoonConfig)

    /**
     * Obtém o JSX da parte de nome e estoque do medicamento, à esquerda do ListItem
     * @param {*} med O medicamento
     * @returns Os dados do medicamento convertido em JSX
     */
    const getInfoRender = (med) =>{
        let stockLabel = (med.stock.unit.liquid ? "~" : "") + Math.round(med.stock.amount) + " " + med.stock.unit.label + (med.stock.amount > 1 ? 's' : '')
        return(<>
            <IconPadding>
                <MedIcon name={med.icon} size={40} color={med.iconColor}/> 
            </IconPadding>
            <ListItem.Content>
                <LeftTitle numberOfLines={1} style={{color: med.iconColor}}>
                    {med.name}
                </LeftTitle>
                <LeftSubtitle>
                    {stockLabel}
                </LeftSubtitle>
            </ListItem.Content></>
        )
    }

    /**
     * Obtém o JSX da parte de doses restantes do medicamento, à direita do ListItem
     * @param {*} med O medicamento
     * @returns Os dados do medicamento convertido em JSX
     */
    const getStatusRender = (med) =>{
        let statusRender
        if(med.status == medStatus.INATIVO){
            statusRender =  
                <RightSubtitle>
                    Tratamento Encerrado
                </RightSubtitle>
        }else if(med.scheduledDoses){
            if(med.days > 0 && med.doses && med.doses.length > 0){
                var dosesLeft = med.doses.filter(d => d.status == doseStatus.NAO_TOMADA || d.status == doseStatus.ADIADA).length
                statusRender = <>
                    <RightTitle style={{color: med.iconColor}}>
                        {dosesLeft} {dosesLeft > 1 ? 'doses' : 'dose'}
                    </RightTitle>
                    <RightSubtitle>
                        {dosesLeft > 1 ? 'restantes' : 'restante'}
                    </RightSubtitle></>
            }else{
                statusRender =
                    <RightSubtitle>
                        {"Tratamento contínuo"}
                    </RightSubtitle>
            }
        }else{
            statusRender =  
                <RightSubtitle>
                    {"Quando\n necessário"}
                </RightSubtitle>
        }
        return (<RightContainer>
                    {statusRender}
                </RightContainer>)
    }

    /**
     * Cria o JSX com os dados de um registro da lista de medicamentos
     * @param {*} med O medicamento 
     * @returns O Medicamento convertido em JSX.
     */
    const getMedItem = ({ item: med }) =>{
        return (
            <ListItem
                key={med.id.toString()}
                bottomDivider
                onPress={() => props.onPress(med)}>
                {getInfoRender(med)}
                {getStatusRender(med)}
            </ListItem>       
        )
    }

    return(
        <>
        {props.visibleMeds.length > 0 
        ?
        <FlatList
        keyExtractor={ (_, index) => `${index}`}
        data={props.visibleMeds}
        renderItem={getMedItem}
        />
        :
        <EmptyListContainer>
            <LightText>
                {NO_MEDS_TEXT}
            </LightText>
        </EmptyListContainer>
        }
        </>
    )
}