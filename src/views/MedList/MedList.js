import React, {useContext} from 'react'
import {FlatList, Alert} from 'react-native'
import { ListItem} from 'react-native-elements'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import AppContext from '../../context/context'
import FAB from '../../components/FloatActionButton'

import {LeftTitle, RightTitle, LeftSubtitle, RightSubtitle, RightContainer, MedListView} from './styles'

export default props =>{

    const {state, dispatch} = useContext(AppContext)

    function navigateToNew(){
        props.navigation.navigate('Med', {screen: 'MedForm'})

    }

    function confirmUserDeletion(user){

        Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?',
         [{
             text:'Sim',
             onPress(){
                 dispatch({
                    type: action.DELETE_USER,
                    payload: user,
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
                onPress={() => props.navigation.navigate('medForm', med)}>
                <Icon source={{uri: med.avatarUrl}}/>
                {/* <Avatar source={{uri: med.avatarUrl}}/> */}
                {/* Nome e quantidade */}
                <ListItem.Content>
                    <LeftTitle>
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
                keyExtractor={user => user.id.toString()}
                data={state.users}
                renderItem={getMedItem}
            />
            <FAB onClick={navigateToNew}/>
        </MedListView>
        
    )
}

