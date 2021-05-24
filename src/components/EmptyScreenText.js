import React from 'react'
import { View, Text} from 'react-native'

export default props => (
    <View style={{
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }}>
        <Text style={{
            fontSize: 50,
            color: props.textColor || '#333'
        }}>
            {props.children}
        </Text>
    </View>
)