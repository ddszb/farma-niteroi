import React, {useContext} from 'react'
import {View, Text, FlatList, Alert, StyleSheet} from 'react-native'
import { Avatar, ListItem, Button } from 'react-native-elements'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import AppContext from '../context/context'
import FAB from '../components/FloatActionButton'


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
                    <ListItem.Title style={styles.leftContentTitle}>
                        {med.name}
                    </ListItem.Title>
                    <ListItem.Subtitle style={styles.leftContentSubtitle}>
                        {med.amount} {med.unit}{med.amount > 1 ? 's' : ''}
                    </ListItem.Subtitle>
                </ListItem.Content>
                {/* Tempo restante */}
                <ListItem.Content style={styles.rightContentContainer}>
                    <ListItem.Title style={[styles.rightContentTitle, {color: med.iconColor}]}>
                        {med.daysLeft} {med.daysLeft > 1 ? 'dias' : 'dia'}
                    </ListItem.Title>
                    <ListItem.Subtitle style={styles.rightContentSubtitle}>
                        {med.daysLeft > 1 ? 'restantes' : 'restante'}
                    </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
                
        )
    }
    
    return (
        <View style={{flex: 1, justifyContent: 'center'}}>
            <FlatList
                keyExtractor={user => user.id.toString()}
                data={state.users}
                renderItem={getMedItem}
            />
            <FAB onClick={navigateToNew}/>
        </View>
        
    )
}

const styles = StyleSheet.create({
    leftContentTitle:{
        color: '#721dab',
        fontSize: 20,
        fontWeight: 'bold',
    },
    leftContentSubtitle:{
        fontSize: 16,
    },
    rightContentContainer:{
        alignItems: 'flex-end',
        marginRight: 10
    },
    rightContentTitle:{
        fontWeight: 'bold',
        fontSize: 18,
    },
    rightContentSubtitle:{
        fontWeight: 'bold',
        fontSize: 16,
        color:'#aaa'
    },


})