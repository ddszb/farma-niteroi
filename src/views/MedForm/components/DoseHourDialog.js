import React, {useState}from 'react'
import{ Text,
    Modal,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native'
import doseUnitsSelection from '../../../constants/doseUnitsSelection'
import doseUnits from '../../../constants/doseUnits'
import UnitSpinner from '../../../components/Spinner';



export default (props) =>{

  const [amount, setAmount] = useState(props.dose ? props.dose.amount : 1)
  const [unit, setUnit] = useState(props.dose ? props.dose.unit : doseUnits.COMPRIMIDO.key)

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => {
          props.close()
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Quanto tomar?</Text>
            <View style={styles.selectionContainer}>
              <TextInput
                      style={styles.input}
                      onChangeText={ amount => setAmount(amount)}
                      value={'' + amount}
                      keyboardType="numeric"/>
              <UnitSpinner 
                  items={doseUnitsSelection} 
                  value={props.dose.unit}
                  onChangeValue={ unit => setUnit(unit)}/> 

            </View>
            <View style={styles.buttonsRow}>
              <TouchableOpacity
                onPress={() => props.close()}
                style={styles.buttonCancel}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.onSet(amount, unit)}
                style={styles.buttonConfirm}>
                <Text style={styles.confirmText}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

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
    width: 60,
    padding: 6,
    elevation: 1,
    backgroundColor: "#6f11fd"
  },
  cancelText:{
    color: '#6f11fd',
    textAlign: 'center'
  },
  confirmText:{
    color: '#fff',
    textAlign: 'center'
  },
  selectionContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between'
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
    color: '#6f11fd'
  }
});
