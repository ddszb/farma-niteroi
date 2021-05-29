import React, {useState} from 'react'
import {StyleSheet, TextInput} from 'react-native'

import {RadioButton, Text} from 'react-native-paper'

import {RadioButtonView, BorderlessInputText} from '../styles'
import WeekdayPicker from 'react-native-weekday-picker'
export default props =>{

    const [daily, setDaily] = useState(true)

    const [days, setDays] = useState({ 1:0, 2:1, 3:0, 4:1, 5:0, 6:1, 0:0})

    var daysVar = days

    const changeValue = (days) =>{    
        setDays(days)
        daysVar = days
    }


return (
    <>
    <RadioButton.Group  onValueChange={newValue => setDaily(newValue)} value={daily}>
      <RadioButtonView>
        <RadioButton value={true} />
        <Text>Todos os dias</Text>
      </RadioButtonView>
      <RadioButtonView>
        <RadioButton value={false} />
        <Text>Dias da semana</Text>
      </RadioButtonView>
    </RadioButton.Group>
      {!daily &&
      <WeekdayPicker
        days={daysVar}
        onChange={changeValue}
        style={styles.picker}
        dayStyle={styles.day}/>}
    </>
)}


const styles = StyleSheet.create({
    picker:{
        padding: 30,
    },
    dayStyle:{
        margin: 5,
        color: 'red'
    }


})