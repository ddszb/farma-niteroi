import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
}  from 'react-native'
import colors from '../../../styles/colors'


export default props =>{
    
    const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"]

    const onPress = (index) =>{
        var days = {...props.days}
        days[index] = days[index] ? 0 : 1
        props.onChange(days)
    }

    const getButtons = () =>{
        return weekdays.map((day, index) => {
            return (
                <TouchableWithoutFeedback 
                    key={'' + index}
                    onPress={() => onPress(index)}>
                    <View style={[styles.button, props.days[index] ? styles.buttonOn : styles.buttonOff]}>
                        <Text style={[styles.text, props.days[index] ? styles.textOn : styles.textOff]}>
                            {day}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        })
    }

    return(
        <View style={styles.container}>
            {getButtons()}
        </View>    
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row'
    },
    button:{
        borderRadius: 25,
        width: 30,
        height: 30,
        padding: 2,
        margin: 3,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonOn:{
        backgroundColor: colors.primary,
    },
    buttonOff:{
        backgroundColor: colors.grey12,
    },
    textOn:{
        color: colors.white,
        margin: 5,
    },
    textOff:{
        color: colors.primary,
        margin: 5,
    }
})