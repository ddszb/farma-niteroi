import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Spinner from "./Spinner";
import { Icon } from 'react-native-elements/dist/icons/Icon'
import colors from "../styles/colors";

const windowWidth = Dimensions.get('window').width;

export default props =>{

    const [value, setValue] = useState(props.initialValue ? props.initialValue : '')
    const [pickerValue, setPickerValue] = useState(props.pickerOptions ? props.pickerOptions[0] : null)

    const onChangeText = (text) =>{
        if(props.inputType == "numeric"){
            var value = text.replace(/[^0-9]/g, '')
        }
        setValue(value)
    }

    const onChangePicker = ( opt )=>{
      var value = props.pickerOptions.filter( o => o.value === opt.value)[0]
      setPickerValue(value)
    }

    const onConfirm = () =>{
      let v = value
      let pick = props.pickerOptions ? pickerValue : null
      if (!props.keepOldText){
        setValue('') 
      }
      props.onSet(v, pick)
    }

    return (
        <Modal
          animationType="fade"
          transparent={true}
          visible={props.visible}
          onRequestClose={() => {
              props.close()
          }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>{props.title}</Text>
                {props.subtitle && <Text style={styles.text}>{props.subtitle}</Text>}
                <View style={styles.selectionContainer}>
                  <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={value}
                    maxLength={props.inputLength}
                    keyboardType={props.inputType}/>
                  {props.pickerOptions 
                  ? <>
                    <Spinner 
                      items={props.pickerOptions} 
                      value={1}
                      onChangeValue={onChangePicker}
                      styles={{width: 140}}/> 
                    </>
                  : <Text style={styles.text}>{props.inputText}</Text>
                  }
                </View>
                <View style={styles.row}>
                  <TouchableOpacity style={styles.cancelButton}
                      activeOpacity={0.5}
                      onPress={() => props.close()}>
                      <View style={[styles.row, styles.centerItems]}>
                        <Text style={styles.buttonText}>
                          {props.cancelText ? props.cancelText : 'Cancelar'}
                        </Text>
                          <Icon name="cancel" type="material-icons" size={20} color={colors.white}/>
                      </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.confirmButton}
                      activeOpacity={0.7}
                      onPress={onConfirm}>
                      <View style={[styles.row, styles.centerItems]}>
                          <Text style={styles.buttonText}>
                              {props.confirmText? props.confirmText : 'Confirmar'}
                          </Text>
                          <Icon name="check-circle" type="font-awesome" size={20} color={colors.white}/>
                      </View>
                  </TouchableOpacity>
                      </View>
                  </View>
                </View>
            </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      backgroundColor: colors.blackOpacity
    },
    modalView: {
      width: windowWidth * 0.7,
      backgroundColor: "white",
      borderRadius: 5,
      alignItems: "center",
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    buttonsRow:{
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    buttonCancel:{
      borderRadius: 5,
      marginTop: 15,
      marginRight: 5,
      padding: 6,
      elevation: 1,
      backgroundColor: colors.grey12,
    },
    buttonConfirm: {
      borderRadius: 5,
      marginTop: 15,
      marginLeft: 5,
      width: 80,
      padding: 6,
      elevation: 1,
      backgroundColor: colors.primary
    },
    row:{
      flexDirection: 'row'
    },
    centerItems:{
      justifyContent: 'center',
      alignItems: 'center'
    },
    cancelButton:{
      flex: 1,
      backgroundColor: colors.grey10,
      justifyContent: 'center',
      alignItems: 'center',
      height: 60,
      borderBottomLeftRadius: 5,
    },
    confirmButton: {
        flex: 1,
        backgroundColor: colors.ok,
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        borderBottomRightRadius: 5,
    },
    buttonText:{
      fontSize: 18,
      color: colors.white,
      fontWeight: 'bold',
      margin: 5,
    },
    selectionContainer:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20
    },
    input: {
      height: 40,
      width: 70,
      overflow: 'hidden' ,
      borderColor: colors.grey8,
      textAlign: 'center',
      color: colors.grey4,
      borderRadius: 5,
      borderWidth: 1,
      marginBottom: 10,
      marginTop: 5,
      padding: 10
    },
    modalText: {
      marginBottom: 15,
      marginTop: 5,
      textAlign: "center",
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.primary
    },
    text: {
      textAlign: "center",
      marginBottom: 5,
      marginLeft: 8,
      fontSize: 16,
      color: colors.primary
    }
  });
  