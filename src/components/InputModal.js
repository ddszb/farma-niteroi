import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default props =>{

    const [value, setValue] = useState(props.initialValue ? props.initialValue : '')

    const onChangeText = (text) =>{
        if(props.inputType == "numeric"){
            var value = text.replace(/[^0-9]/g, '')
        }
        setValue(value)
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
                    <Text style={styles.text}>{props.inputText}</Text>

                    </View>
                    <View style={styles.buttonsRow}>
                    <TouchableOpacity
                        onPress={() => props.close()}
                        style={styles.buttonCancel}>
                        <Text style={styles.cancelText}>{props.cancelText ? props.cancelText : 'Cancelar'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            let v = value
                            setValue('') 
                            props.onSet(v)
                        }}
                        style={styles.buttonConfirm}>
                        <Text style={styles.confirmText}>{props.confirmText? props.confirmText : 'Ok'}</Text>
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
      marginTop: 22
    },
    modalView: {
      margin: 10,
      backgroundColor: "white",
      borderRadius: 5,
      padding: 15,
      alignItems: "center",
      shadowColor: "#000",
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
      backgroundColor: "#ddd",
    },
    buttonConfirm: {
      borderRadius: 5,
      marginTop: 15,
      marginLeft: 5,
      width: 80,
      padding: 6,
      elevation: 1,
      backgroundColor: "#63488c"
    },
    cancelText:{
      color: '#63488c',
      textAlign: 'center'
    },
    confirmText:{
      color: '#fff',
      textAlign: 'center'
    },
    selectionContainer:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    input: {
      height: 40,
      width: 70,
      overflow: 'hidden' ,
      borderColor: 'gray',
      textAlign: 'center',
      color:'#444',
      borderRadius: 5,
      borderWidth: 1,
      marginBottom: 10,
      marginTop: 5,
      padding: 10
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      fontSize: 20,
      fontWeight: 'bold',
      color: '#63488c'
    },
    text: {
      textAlign: "center",
      marginBottom: 5,
      marginLeft: 8,
      fontSize: 16,
      color: '#63488c'
    }
  });
  