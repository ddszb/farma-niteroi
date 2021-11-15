import React from "react"

import colors from '../styles/colors'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

export default props => {

    return(
        <>
        {props.visible &&
        <View style={props.bottom ? styles.bottom : styles.container}>
            {props.outerText &&
            <Text style={styles.outerText}>
                {props.outerText}
            </Text>}
            <TouchableOpacity 
            style={styles.button}
            onPress={() => props.onClick()}>
                <Text style={styles.text}>
                    {props.text}
                </Text>
            </TouchableOpacity>
        </View>}
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 0.1,
    },
    bottom:{
        width: '100%',
        position: 'absolute',
        bottom: 5
    },
    button:{
        flex: 2,
        minHeight: 55,
        marginTop: 5,
        borderRadius: 6,
        marginHorizontal: 20,
        justifyContent: "center",
        backgroundColor: colors.primary,
    },
    text:{
        fontSize: 23,
        fontWeight: "bold",
        textAlign: "center",
        color: colors.white,
    },
    outerText:{
        fontSize: 17,
        color: colors.grey6,
        textAlign: 'center',
        paddingBottom: 10,
    }
    
})