import React, {useState} from 'react'
import { Dimensions, Modal, View, Text, TouchableOpacity, StyleSheet, TextInput }  from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import doseStatus from '../../../constants/doseStatus'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import 'moment/locale/pt-br'
import colors from '../../../styles/colors'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
        if(d.status == doseStatus.NAO_TOMADA && moment(dialogTime) > moment()){
            d.newDate = dialogTime
        }else{
            d.dateTaken = dialogTime
        }
        d.amount = dialogAmount
        props.onSet(d)
    }

    const timeAmountContent = () =>{
        let time = moment(dialogTime).format("HH:mm")
        var confirmLabel = "Ajustar"
        if(dose.status == doseStatus.NAO_TOMADA && moment(dialogTime).isSameOrBefore(moment())){
            confirmLabel = "Tomar"
        }
        return(
            <>
            <View style={styles.form}>
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
                <View style={[styles.row, styles.centerItems]}>
                    <TextInput 
                        style={styles.input}
                        keyboardType="numeric"
                        onChangeText={changeAmount}
                        value={dialogAmount}
                        maxLength={4}/>
                    <Text style={[styles.text, {marginTop: 6}]}>
                        {dose.unit.label}(s)
                    </Text>
                </View>
            </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.cancelButton}
                        activeOpacity={0.5}
                        onPress={() => props.close()}>
                        <View style={[styles.row, styles.centerItems]}>
                            <Text style={styles.buttonText}>
                                Cancelar
                            </Text>
                            <Icon name="cancel" type="material-icons" size={20} color={colors.white}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.confirmButton}
                        activeOpacity={0.7}
                        onPress={confirm}>
                        <View style={[styles.row, styles.centerItems]}>
                            <Text style={styles.buttonText}>
                                {confirmLabel}
                            </Text>
                            <Icon name="check-circle" type="font-awesome" size={20} color={colors.white}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </>
        )
    }

    const modalContent = () =>{

        var title = "Ajustar dose"
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
                    maximumDate={new Date()}
                    mode="time"
                    is24Hour={true}
                    display="spinner"
                    textColor={colors.primary}
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
        backgroundColor: colors.blackOpacity
    },
    modalView: {
        width: windowWidth * 0.7,
        height: 330,
        backgroundColor: colors.white,
        borderRadius: 5,
        alignItems: "center",
        shadowColor: colors.blackOpacity,
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
    centerItems:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    title:{
        marginVertical: 10,
        textAlign: "center",
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.primary
    },
    text: {
        textAlign: "justify",
        marginBottom: 2,
        marginLeft: 8,
        fontSize: 20,
        color: colors.grey8
    },
    hourText:{
        color: colors.primary,
        fontWeight: 'bold', 
        fontSize: 22,
        marginVertical: 10
    },
    input: {
        overflow: 'hidden' ,
        textAlign: 'center',
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.grey10,
        width: 60,
        marginHorizontal: 6,
        marginTop: 12, 
    },
    amountText: {
        textAlign: "justify",
        marginBottom: 2,
        marginLeft: 8,
        fontSize: 14,
        color: colors.primary
    },
    form:{
        flex: 1,
        padding: 15,
        alignItems:"center"
    },
    buttonView:{
        flex: 0.2,
        justifyContent: 'center',
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
    }
})