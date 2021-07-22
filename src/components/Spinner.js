import { Picker } from '@react-native-picker/picker';
import React, {useState} from 'react'
import { View, StyleSheet } from "react-native";

export default props =>{
    const [selectedValue, setSelectedValue] = useState(props.items[0].value);

    const defaultStyles = {height: 40, width: 190, color: '#63488c'}
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
            style={props.styles || defaultStyles}
            mode="dialog"
            dropdownIconColor="#eaeaea"
            onValueChange={onValueChange}>
            {getList()}
          </Picker>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingTop: 4,
        alignItems: "center"
      }
    });
