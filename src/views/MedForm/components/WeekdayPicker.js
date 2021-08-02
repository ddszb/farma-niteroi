import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
}  from 'react-native'


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
        backgroundColor: "#63488c",
    },
    buttonOff:{
        backgroundColor: "#CCC",
    },
    textOn:{
        color: "#FFF",
        margin: 5,
    },
    textOff:{
        color: "#63488c",
        margin: 5,
    }
})