import React from "react";
import { Alert, Dimensions, TouchableOpacity, ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AutoCompleteInput from "../../../components/AutoCompleteInput";
import meds_niteroi from "../../../data/meds_niteroi";
import { Button, ButtonText, CardBox, CardContent, FormFieldLabel, ResetButton, ViewFlexRow } from "../styles";
import { Icon } from 'react-native-elements/dist/icons/Icon'
import colors from "../../../styles/colors";
import storageKeys from "../../../constants/storageKeys";
import medStatus from "../../../constants/medStatus";

/**
 * Componente para nome do medicamento no cadastro de medicamentos.
 */
export default props =>{
    

    const windowWidth = Dimensions.get('window').width;

    const autoCompleteOptions = meds_niteroi.map((med, index )=> ({key: index, value: med.nome + " " + med.dosagem}))
    .sort((a, b) => a.value.toLowerCase() > b.value.toLowerCase() ? 1 : -1)

    /**
     * Verifica se o nome do medicamento foi preenchido. 
     * Se sim, exibirá os próximos campos
     */
    const onConfirm = async () =>{
        if(props.med.name){
            const medsString = await AsyncStorage.getItem(storageKeys.MEDS)
            const meds = medsString !== null ? JSON.parse(medsString) : []
            if(meds.filter( m => m.name.toLowerCase() == props.med.name.toLowerCase() && m.status == medStatus.ATIVO).length > 0){  
                ToastAndroid.showWithGravityAndOffset("Você já iniciou um tratamento com este medicamento.",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM, 0 , 90)
                return
            } 
            props.onConfirm()
        }
    }

    /**
     * Exibe um alerta de confirmação ao pressionar o botão de limpar o formulário.
     */
    const onPressReset = () =>{
        Alert.alert('Limpar dados', 'Deseja limpar as informações preenchidas?',
        [{text: 'Não'},
        {text:'Sim',
         onPress(){
             props.onReset()
        }}])
    }

    return(
        <>
        <CardBox>
            <CardContent>
                <FormFieldLabel>Nome</FormFieldLabel>
                <ViewFlexRow>
                <AutoCompleteInput
                    editable={!props.medPicked}
                    data={autoCompleteOptions}
                    onChange={props.onChangeName}
                    placeholder="Nome do medicamento"
                    value={props.med.name}
                    styles={{width: windowWidth * 0.75}}
                />
                {props.medPicked &&
                <ResetButton onPress={onPressReset}>
                    <Icon name={"eraser"} type={"font-awesome-5"} size={25} color={colors.primary}/>
                </ResetButton>}
                </ViewFlexRow>
            </CardContent>
        </CardBox>
        {!props.medPicked &&
        <TouchableOpacity onPress={onConfirm}>
            <Button>
                <ButtonText>
                    Próximo
                </ButtonText>
            </Button>
        </TouchableOpacity>}
        </>
    )
}