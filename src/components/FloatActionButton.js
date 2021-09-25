import React from 'react'
import { View, TouchableHighlight} from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import colors from '../styles/colors'

export default props => (
    <View style={{
        position: 'absolute',                                          
        bottom: 12,                                                    
        right: 12, 
    }}>

        <TouchableHighlight 
            onPress={ () => props.onClick()}
            underlayColor={colors.grey4Opacity}>
            <Icon 
                name='add-circle'
                size={56}
                type={'ionicons'}
                color={colors.primary}
                />
        </TouchableHighlight>
    </View>
)