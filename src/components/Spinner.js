import { Picker } from '@react-native-picker/picker';
import React, {useState} from 'react'
import colors from '../styles/colors';
export default props =>{
    const [selectedValue, setSelectedValue] = useState(props.items[0].value);

    const defaultStyles = {height: 40, color: colors.primary, textAlign:'right', fontSize: 30}
    const getList = () =>{
      return props.items.map( i => {
        return <Picker.Item 
            label={i.label}
            value={i.value}
            key={i.key}/>
      } )
    }

    const onValueChange = (itemValue, itemIndex) =>{
      var item = props.items.filter( i => i.value === itemValue)[0]
      setSelectedValue(itemValue)
      props.onChangeValue(item)
    }

    return (
          <Picker
            selectedValue={selectedValue}
            value={props.value}
            style={[defaultStyles, props.styles ? props.styles : {}]}
            mode="dialog"
            onValueChange={onValueChange}>
            {getList()}
          </Picker>
      );
}