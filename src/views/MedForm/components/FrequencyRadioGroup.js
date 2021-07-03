import React, {useState} from 'react'
import {StyleSheet, TextInput} from 'react-native'

import {RadioButton, Text} from 'react-native-paper'

import {RadioButtonView, BorderlessInputText} from '../styles'
import WeekdayPicker from 'react-native-weekday-picker'
export default props =>{

    const [daily, setDaily] = useState(true)
    const [prevDays, setPrevDays] = useState(props.days)

    const __getTimesAWeek = (days) =>{
      var toWeekdays = k => days[k]
      var sum = (a, b) => a + b
      return Object.keys(days).map(toWeekdays).reduce(sum)
  }

    const __onChangeValue  = (days) =>{
      if(__getTimesAWeek(days) > 0){
        setPrevDays(days)
        props.onChangeValue(days, daily)
      }else{
        props.onChangeValue(prevDays, daily)
      }
    }
    

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
        days={props.days}
        onChange={ (d) => __onChangeValue(d)}
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