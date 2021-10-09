import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import Home from '../views/Home/Home'
import ListaMeds from '../views/ListaMeds/ListaMeds'
import MedForm from '../views/MedForm/MedForm'
import MedDetail from '../views/MedDetail/MedDetail'
import Search from '../views/Busca/Busca'
import MedsNiteroi from '../views/MedsNiteroi/MedsNiteroi'
import Policlinicas from '../views/Policlinicas/Policlinicas'
import MedNiteroiDetalhe from '../views/MedsNiteroi/MedNiteroiDetalhe'
import NewDoseForm from '../views/DoseForm/NewDoseForm'
import Tutorial from '../views/Tutorial/Tutorial'

const Stack = createStackNavigator()

/**
 * Stack Navigator para a tela de Doses (home)
 * @returns StackNavigator
 */
const DosesStackNavigator = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name="DosesStack" component={Home}/>
            <Stack.Screen name="Adicionar Dose" component={NewDoseForm}/>
            <Stack.Screen name="Tutorial" options={{headerShown: false}} component={Tutorial}/>
        </Stack.Navigator>
    )
}

/**
 * Stack Navigator para a tela de Medicamentos
 * @returns StackNavigator
 */
const MedStackNavigator = () =>{
    return (
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name="Meus Medicamentos" component={ListaMeds}/>
            <Stack.Screen name="Adicionar Medicamento" component={MedForm}/>
            <Stack.Screen name="Meu Medicamento" component={MedDetail}/>
        </Stack.Navigator>
    )
}

/**
 * Stack Navigator para a tela de Busca
 * @returns StackNavigator
 */
const SearchStackNavigator = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name="ProcurarStack" component={Search}/>
            <Stack.Screen options={{headerTitle: "voltar"}} name="Medicamento Niteroi Detalhe" component={MedNiteroiDetalhe}/>
            <Stack.Screen options={{headerTitle:"Medicamentos da Prefeitura"}} name="Medicamentos Niterói" component={MedsNiteroi}/>
            <Stack.Screen  name="Policlínicas" component={Policlinicas}/>
        </Stack.Navigator>
    )
}

export {DosesStackNavigator, MedStackNavigator, SearchStackNavigator}