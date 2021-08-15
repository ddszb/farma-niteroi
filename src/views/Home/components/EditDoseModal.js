import React, {useState} from 'react'
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput }  from 'react-native'
import doseStatus from '../../../constants/doseStatus'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import 'moment/locale/pt-br'

export default props =>{

    const [dose, setDose] = useState(props.dose)
    const [dialogTime, setDialogTime] = useState(props.dose.dateTaken ? new Date(props.dose.dateTaken) : new Date(props.dose.date))
    const [dialogAmount, setDialogAmount] = useState(props.dose.amount ? '' + props.dose.amount : '1')
    const [showPicker, setShowPicker] = useState(false)


    const changeTime = (event, date) =>{
        if(date === undefined){
            setShowPicker(false)
            return
        }
        if(event.type === "set"){
            setShowPicker(false)
            setDialogTime(date)
        }
    }

    const changeAmount = (amount) =>{
        amount = amount.replace(/[^0-9]/g, '')
        if (amount == "0"){
            amount = "1"
        }
        setDialogAmount(amount)
    }

    const confirm = () =>{
        var d = {...dose}
        d.amount = dialogAmount
        d.dateTaken = dialogTime
        props.onSet(d)
    }

    const timeAmountContent = () =>{
        let time = moment(dialogTime).format("HH:mm")
        return(
            <>
            <Text style={styles.text}>
                Horário
            </Text>
            <View>
                <TouchableOpacity onPress={() => setShowPicker(true)}>
                    <Text style={styles.hourText}>
                        {time}
                    </Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.text}>
                Quantidade
            </Text>
            <View styles={styles.row}>
                <TextInput 
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={changeAmount}
                    value={dialogAmount}
                    maxLength={4}/>
                <Text style={styles.text}>
                    {dose.unit.label}(s)
                </Text>
            </View>
            <View style={styles.row}>
                <TouchableOpacity
                    onPress={() => props.close()}
                    style={styles.buttonCancel}>
                    <Text style={styles.cancelText}>
                        Cancelar
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={confirm}
                    style={styles.buttonConfirm}>
                    <Text style={styles.confirmText}>
                        Ok
                    </Text>
                </TouchableOpacity>
            </View>
            </>
        )
    }

    const modalContent = () =>{

        var title = dose.status == doseStatus.TOMADA ? "Ajustar dose" : "Tomar dose" 
        var content = timeAmountContent()

        return(
            <>
            <Text style={styles.title}>
                {title}
            </Text>
            {content}
            </>
        )
    }

    return(
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.visible}
            onRequestClose={() => props.close()}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {modalContent()}
                </View>
            </View>
            { showPicker && 
                (<DateTimePicker
                    value={dialogTime}
                    mode="time"
                    is24Hour={true}
                    display="spinner"
                    textColor="#63488c"
                    timeZoneOffsetInMinutes={-180}
                    minuteInterval={5}
                    onChange={changeTime}/>)
            }
        </Modal>
    )

}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 10,
        width: 210,
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
    row:{
        flexDirection: 'row'
    },
    title:{
        marginBottom: 15,
        textAlign: "center",
        fontSize: 16,
        fontWeight: 'bold',
        color: '#63488c'
    },
    text: {
        textAlign: "justify",
        marginBottom: 2,
        marginLeft: 8,
        fontSize: 16,
        color: '#63488c'
    },
    hourText:{
        color:'#63488c',
        fontWeight: 'bold', 
        fontSize: 20,
        marginVertical: 10
    },
    input: {
        overflow: 'hidden' ,
        textAlign: 'center',
        color:'#63488c',
        fontWeight: 'bold',
        fontSize: 18,
    },
    amountText: {
        textAlign: "justify",
        marginBottom: 2,
        marginLeft: 8,
        fontSize: 14,
        color: '#63488c'
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
})