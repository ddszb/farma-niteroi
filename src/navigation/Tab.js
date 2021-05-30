import React from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../views/Home'
import Info from '../views/Info'
import ListaMeds from '../views/ListaMeds/ListaMeds'
import MedForm from '../views/MedForm/MedForm'
import MedDetail from '../views/MedDetail/MedDetail'
import Search from '../views/Busca/Busca'
import MedsNiteroi from '../views/MedsNiteroi/MedsNiteroi'
import Policlinicas from '../views/Policlinicas/Policlinicas';


const Tab = createBottomTabNavigator()

const MedsStack = createStackNavigator()
const SearchStack = createStackNavigator()

function MedStackScreen() {
    return (
        <MedsStack.Navigator>
            <MedsStack.Screen name="Meus Medicamentos" component={ListaMeds}/>
            <MedsStack.Screen name="Adicionar Medicamento" component={MedForm}/>
            <MedsStack.Screen name="Meu Medicamento" component={MedDetail}/>
        </MedsStack.Navigator>
    )
}

function SearchStackScreen(){
    return(
        <SearchStack.Navigator>
            <SearchStack.Screen options={{headerShown: false}} name="Procurar" component={Search}/>
            <SearchStack.Screen options={{headerTitle:"Medicamentos da Prefeitura"}} name="Medicamentos Niterói" component={MedsNiteroi}/>
            <SearchStack.Screen  name="Policlínicas" component={Policlinicas}/>
        </SearchStack.Navigator>
    )
}

export default props =>(
    <Tab.Navigator 
    screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            let iconName
            switch (route.name){
                case 'Home':
                    iconName = focused
                    ? 'home'
                    : 'home-outline'
                    break
                case 'Medicamentos':
                    iconName = focused
                    ? 'medkit'
                    : 'medkit-outline'
                    break
                case 'Procurar':
                    iconName = focused
                    ? 'search'
                    : 'search-outline'
                    break
                case 'Informação':
                    iconName = focused
                    ? 'help'
                    : 'help-outline'
                    break
            }
                        
            return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    tabBarOptions={{
        activeTintColor: '#63488c',
        inactiveTintColor: '#5f5f5f',
        showLabel: true,
        labelStyle: {fontSize: 10}
    }} initialRouteName="Home">
        <Tab.Screen name="Home" component={Home}/>
        <Tab.Screen name="Medicamentos" component={MedStackScreen}/>
        <Tab.Screen name="Procurar" component={SearchStackScreen}/>
        <Tab.Screen name="Informação" component={Info}/>
    </Tab.Navigator>
)

