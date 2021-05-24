import React from 'react'
import { View, TouchableHighlight} from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'


export default props => (
    <View style={{
        width: 50,  
        height: 50,   
        borderRadius: 30,            
        backgroundColor: '#721dab',                                    
        position: 'absolute',                                          
        bottom: 10,                                                    
        right: 10, 
        justifyContent:'center'
        }}>
        <TouchableHighlight onPress={ () => props.onClick()}>
            <Icon 
                name='add'
                size={25}
                color='#fff'
                />
    </TouchableHighlight>
    </View>
)