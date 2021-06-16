import React, {useState} from 'react'
import {StyleSheet, TextInput} from 'react-native'

import {RadioButton, Text} from 'react-native-paper'

import {RadioButtonView, BorderlessInputText} from '../styles'
import WeekdayPicker from 'react-native-weekday-picker'
export default props =>{


    const [daily, setDaily] = useState(true)

    var defaultDays = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 0:0}

return (
    <>
    <RadioButton.Group  onValueChange={newValue =>{
        setDaily(newValue)      
        props.onChangeValue(props.days, newValue)
      }}
      value={daily}>
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
        days={props.days || defaultDays}
        onChange={ (d) => props.onChangeValue(d, daily)}
        style={styles.picker}
        dayStyle={styles.day}/>}
    </>
)}


const styles = StyleSheet.create({
    picker:{
        padding: 30,
    },
    dayStyle:{
        margin: 5
    }


})