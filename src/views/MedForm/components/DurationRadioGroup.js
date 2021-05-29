import React, {useState} from 'react'
import {View} from 'react-native'

import {RadioButton, Text} from 'react-native-paper'

import {ViewFlexRow} from '../styles'

export default props =>{

    const [ongoing, setOngoing] = useState(false) 
    const [value, setValue] = React.useState('first')
return (

    <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
      <ViewFlexRow>
        <RadioButton value="first" />
        <Text>First</Text>
      </ViewFlexRow>
      <ViewFlexRow>
        <RadioButton value="second" />
        <Text>Second</Text>
      </ViewFlexRow>
    </RadioButton.Group>
)
}
