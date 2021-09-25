import React from 'react'
import { View, Text} from 'react-native'
import colors from '../styles/colors'

export default props => (
    <View style={{
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: colors.white
    }}>
        <Text style={{
            fontSize: 50,
            color: props.textColor || colors.grey4
        }}>
            {props.children}
        </Text>
    </View>
)