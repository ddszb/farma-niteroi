import { Picker } from '@react-native-picker/picker';
import React, {useState} from 'react'
import { View, StyleSheet } from "react-native";

export default props =>{
    const [selectedValue, setSelectedValue] = useState(props.items[0].value);

    const getList = () =>{
      return props.items.map( i => {
        return <Picker.Item 
            label={i.label}
            value={i.value}
            key={i.key}/>
      } )
    }

    return (
          <Picker
            selectedValue={selectedValue}
            style={{ height: 50, width: 190,}}
            mode="dropdown"
            selectedValue={ props.value ? props.value : undefined}
            onValueChange={(itemValue, itemIndex) =>{ 
              setSelectedValue(itemValue)
              props.onChangeValue(itemValue)
            }}
          >
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
