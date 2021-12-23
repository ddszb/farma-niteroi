import React from 'react'
import {
    View,
}  from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import colors from '../styles/colors'


export default props =>{
    if(props.visible){
        return(
        <View style={{height: "100%", justifyContent: 'center', alignItems: 'center',}}>
            <ActivityIndicator size={100} color={colors.primary}/>
        </View>
        )
    }
    return <></>
}
