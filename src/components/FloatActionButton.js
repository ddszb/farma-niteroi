import React from 'react'
import { View, TouchableHighlight} from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'


export default props => (
    <View style={{
        position: 'absolute',                                          
        bottom: 12,                                                    
        right: 12, 
    }}>

        <TouchableHighlight 
            onPress={ () => props.onClick()}
            underlayColor="#4440">
            <Icon 
                name='add-circle'
                size={56}
                type={'ionicons'}
                color='#63488c'
                />
        </TouchableHighlight>
    </View>
)