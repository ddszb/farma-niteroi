import React from 'react'
import { TouchableOpacity } from 'react-native'

import {Button, ButtonText, Container, Text} from './styles'
import Header from '../../components/Header'
export default props =>{
    
    
    function navigateToMeds(){
        props.navigation.navigate('Medicamentos Niterói', {screen: 'Adicionar Medicamento'})
    }

    function navigateToPoli(){
        props.navigation.navigate('Policlínicas', {screen: 'Policlínicas'} )
    }


    return(
        <>
        <Header 
            title="Procurar"
            onPressLeft={() => props.navigation.toggleDrawer()}/>
        <Container>
            <Text>
                Veja a relação de medicamentos oferecidos gratuitamente pela prefeitura de niterói
            </Text>
            <TouchableOpacity
                onPress={navigateToMeds}>
                <Button>
                    <ButtonText> Medicamentos</ButtonText>
                </Button>
            </TouchableOpacity>
            <Text>
                Veja a relação de policlínicas que oferecem medicamentos gratuitamente
            </Text>
            <TouchableOpacity
                onPress={navigateToPoli}>
                <Button>
                    <ButtonText> Policlínicas</ButtonText>
                </Button>
            </TouchableOpacity>
        </Container>
        </>
    )
}