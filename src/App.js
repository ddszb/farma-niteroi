import React from 'react'
import { SafeAreaView, Text} from 'react-native'

import Home from './views/Home'
import Info from './views/Info'
import MedList from './views/MedList'
import Search from './views/Search'

export default props => (
    <SafeAreaView style={{flex:1}}>
        <Home/>
        <MedList/>
        <Search/>
        <Info/>
    </SafeAreaView>
)