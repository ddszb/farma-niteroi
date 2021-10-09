import React from "react"
import colors from '../styles/colors'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { Icon } from "react-native-elements/dist/icons/Icon"

export default props => {

    return(
        <View style={styles.header}>
            <TouchableOpacity style={{marginLeft: 10}} onPress={props.onPressLeft}>
                <Icon name="menu" type="entypo" color={colors.primary} size={32}/>
            </TouchableOpacity>
            <Text style={styles.title}>
                {props.title}
            </Text>
            {props.rightButton 
            ?
            <TouchableOpacity style={{marginRight: 10}} onPress={props.onPressRight}>
                <Icon name={props.rightButton} type="material-community" color={colors.primary} size={32}/>
            </TouchableOpacity>
            :
            <View style={{marginRight: 42}}/>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: colors.grey13
    },
    title:{
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 7,
        color: colors.primary,
        textAlign: 'center'
    }
})
