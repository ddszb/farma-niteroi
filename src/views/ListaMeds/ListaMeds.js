import React, {useState, useEffect} from 'react'
import {FlatList, Alert, Button} from 'react-native'
import { ListItem} from 'react-native-elements'
import FAB from '../../components/FloatActionButton'
import { createIconSetFromIcoMoon } from 'react-native-vector-icons'
import iconMoonConfig from '../../selection.json'
import {LeftTitle, RightTitle, LeftSubtitle, RightSubtitle, RightContainer,
     MedListView, IconPadding} from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import analytics from '@react-native-firebase/analytics'

export default props =>{
    
    const [meds, setMeds] = useState([])
    const MedIcon = createIconSetFromIcoMoon(iconMoonConfig)
    
    clearAsyncStorage = async() => {
        AsyncStorage.clear();
    }

    useEffect(() =>{
        async function getMeds(){
            const medsString = await AsyncStorage.getItem('medsList')
            const meds = JSON.parse(medsString) || []
            setMeds(meds)
        }
        getMeds()
    }, [meds])


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

    const __getDaysLeft = (med) =>{
        var _MS_PER_DAY = 1000 * 60 * 60 * 24
        var startDate = new Date(med.startDate)
        var endDate = new Date(med.endDate)
        const utc1 = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
        const utc2 = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())
        return Math.floor((utc2 - utc1) / _MS_PER_DAY)
    }

    const __getRightContent = (med) =>{
        if(med.scheduledDoses){
            if(med.days > 0 && med.startDate && med.endDate){
                var daysLeft = __getDaysLeft(med)
                return(
                <>
                    <RightTitle style={{color: med.iconColor}}>
                    {daysLeft} {daysLeft > 1 ? 'dias' : 'dia'}
                    </RightTitle>
                    <RightSubtitle>
                        {daysLeft > 1 ? 'restantes' : 'restante'}
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
                    {"Tomar quando necessário"}
                </RightSubtitle>
            )
        }
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
                    {__getRightContent(med)}
                </RightContainer>
            </ListItem>
                
        )
    }
    
    return (
        <MedListView>
            <Button onPress={clearAsyncStorage} title="Limpar"/>
            <FlatList
                keyExtractor={med => med.id.toString()}
                data={meds}
                renderItem={getMedItem}
            />
            <FAB onClick={navigateToNew}/>

        </MedListView>
        
    )
}

