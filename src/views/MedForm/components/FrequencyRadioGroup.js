import React, {useState} from 'react'
import {StyleSheet, View} from 'react-native'

import {RadioButton, Text} from 'react-native-paper'

import {RadioButtonView, BorderlessInputText} from '../styles'
import WeekdayPicker from './WeekdayPicker'

const dailyTemplate = { 0:1, 1:1, 2:1, 3:1, 4:1, 5:1, 6:1}

export default props =>{

    const [daily, setDaily] = useState(true)

    
    const onChangeButton = (isDaily) =>{
      if(isDaily){
        props.onChangeDays(dailyTemplate)
      }
    }
    

return (
    <>
    <RadioButton.Group  onValueChange={newValue =>{
        setDaily(newValue)      
        onChangeButton(newValue)
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
      <View style={styles.weekday}>
        <WeekdayPicker
          days={props.days}
          onChange={props.onChangeDays}/>
      </View>}
    </>
)}


const styles = StyleSheet.create({
    picker:{
        padding: 30,
    },
    dayStyle:{
        margin: 5
    },
    weekday:{
      justifyContent: 'center',
      alignItems: 'center'
    }

})