import React, {useState} from 'react'
import {Text, View} from 'react-native'
import EmptyScreenText from '../components/EmptyScreenText'

import DoseTimes from '../components/DoseTimes'

export default props =>{

    const [texto, setText] = useState("A");

    function updateText(obj){
        console.warn(Object.keys(obj))
    }
    return(
        <View style={{flex: 1, justifyContent: 'center'}}>
            <DoseTimes onSet={updateText}/>
        </View>

    )

}
   
