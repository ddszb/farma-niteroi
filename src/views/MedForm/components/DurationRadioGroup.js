import React, {useState} from 'react'

import {Text} from 'react-native-paper'

import {RadioButtonView, BorderInputText} from '../styles'

export default props =>{

  const [ongoing, setOngoing] = useState(false)
  const [days, setDays] = useState(7)

  const __onValueChange = isOngoing =>{
    setOngoing(isOngoing)
    props.onChangeValue(isOngoing ? 0 : days)
  }

  const onChangeDays = days =>{
    days = days.replace(/[^0-9]/g, '')
    if( +days <= 0 ){
      days = ""
    }
    if( + days > 365){
      days = "365"
    }
    setDays(days)
    props.onChangeValue(days)
  }

  return (
    <RadioButtonView>
    <Text>Número de dias</Text>
    { !ongoing &&
    <BorderInputText
      maxLength={3}
      style={{marginLeft: 7}}
      onChangeText={ onChangeDays}
      value={'' + days}
      keyboardType="numeric"/>}
    </RadioButtonView>

      // Funcionalidade a ser implementada no futuro
      // <RadioButton.Group 
      //   onValueChange={__onValueChange} 
      //   value={ongoing}>
      //   <RadioButtonView>
      //     <RadioButton value={false} />
      //     <Text>Número de dias</Text>
      //     { !ongoing &&
      //     <BorderlessInputText
      //       style={{marginLeft: 7}}
      //       onChangeText={ days => setDays(days)}
      //       value={'' + days}
      //       keyboardType="numeric"/>}
      //   </RadioButtonView>
      //   <RadioButtonView>
      //     <RadioButton value={true} />
      //     <Text>Tratamento contínuo</Text>
      //   </RadioButtonView>
      // </RadioButton.Group>
  )
}
