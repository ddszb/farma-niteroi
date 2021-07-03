import React, {useState} from 'react'
import {TextInput} from 'react-native'

import {RadioButton, Text} from 'react-native-paper'

import {RadioButtonView, BorderlessInputText} from '../styles'

export default props =>{

  const [ongoing, setOngoing] = useState(false)
  const [days, setDays] = useState(7)

  const __onValueChange = isOngoing =>{
    setOngoing(isOngoing)
    props.onChangeValue(isOngoing ? 0 : days)
  }

  return (

      <RadioButton.Group 
        onValueChange={__onValueChange} 
        value={ongoing}>
        <RadioButtonView>
          <RadioButton value={false} />
          <Text>Número de dias</Text>
          { !ongoing &&
          <BorderlessInputText
            style={{marginLeft: 7}}
            onChangeText={ days => setDays(days)}
            value={'' + days}
            keyboardType="numeric"/>}
        </RadioButtonView>
        <RadioButtonView>
          <RadioButton value={true} />
          <Text>Tratamento contínuo</Text>
        </RadioButtonView>
      </RadioButton.Group>
  )
}
