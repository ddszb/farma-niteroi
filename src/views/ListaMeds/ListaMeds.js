import React, {useContext} from 'react'
import {FlatList, Alert} from 'react-native'
import { ListItem} from 'react-native-elements'
import AppContext from '../../context/context'
import FAB from '../../components/FloatActionButton'
import { createIconSetFromIcoMoon } from 'react-native-vector-icons'
import iconMoonConfig from '../../selection.json'
import {LeftTitle, RightTitle, LeftSubtitle, RightSubtitle, RightContainer,
     MedListView, IconPadding} from './styles'

export default props =>{

    const {state, dispatch} = useContext(AppContext)

    const MedIcon = createIconSetFromIcoMoon(iconMoonConfig)

    function navigateToNew(){
        props.navigation.navigate('Adicionar Medicamento', {screen: 'Adicionar Medicamento'})
    }

    function navigateToView(med){
        props.navigation.navigate('Meu Medicamento', {screen: 'Meu Medicamento', med: med} )
    }

    function confirmMedDeletion(med){

        Alert.alert('Excluir Medicamento', 'Deseja remover o medicamento?',
         [{
             text:'Sim',
             onPress(){
                 dispatch({
                    type: action.DELETE_MED,
                    payload: med,
                })
             }
         },
        {   
            text: 'Não'
        }])
    }



    function getMedItem({ item: med }){
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
                    <LeftTitle style={{color: med.iconColor}}>
                        {med.name}
                    </LeftTitle>
                    <LeftSubtitle>
                        {med.amount} {med.unit}{med.amount > 1 ? 's' : ''}
                    </LeftSubtitle>
                </ListItem.Content>
                {/* Tempo restante */}
                <RightContainer>
                    <RightTitle style={{color: med.iconColor}}>
                        {med.daysLeft} {med.daysLeft > 1 ? 'dias' : 'dia'}
                    </RightTitle>
                    <RightSubtitle>
                        {med.daysLeft > 1 ? 'restantes' : 'restante'}
                    </RightSubtitle>
                </RightContainer>
            </ListItem>
                
        )
    }
    
    return (
        <MedListView>
            <FlatList
                keyExtractor={med => med.id.toString()}
                data={state.meds}
                renderItem={getMedItem}
            />
            <FAB onClick={navigateToNew}/>
        </MedListView>
        
    )
}

