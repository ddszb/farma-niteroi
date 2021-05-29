import React, {useState} from 'react'
import {View} from 'react-native'
import { createIconSetFromIcoMoon } from 'react-native-vector-icons'
import iconMoonConfig from '../selection.json'

export default props =>{

    const [texto, setText] = useState(true);

    function updateText(obj){
        console.warn(Object.keys(obj))
    }
    const Icon = createIconSetFromIcoMoon(iconMoonConfig)
    return(
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Icon name="med_pill" size={80} color="#ddbbff"/>
            <Icon name="med_caps" size={80} color="#4fbffa"/>
            <Icon name="med_square" size={80} color="#33fabc"/>
        </View>

    )

}
   
