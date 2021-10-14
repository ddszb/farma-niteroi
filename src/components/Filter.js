import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SwipeablePanel } from 'rn-swipeable-panel';
import colors from '../styles/colors'

/**
 * Componente genérico para filtro com swipeable panel
 */
export default props => {

  const [value, setValue] = useState()  

    useEffect(() =>{
        getSavedFilter()
    }, [])

    /**
     * Busca no local storage a última opção salva.
     */
    const getSavedFilter = async () =>{
        const value = await AsyncStorage.getItem(props.storageKey)
        let filter = value || '0'
        setValue(filter)
        props.onChangeValue(value)
    }

    /**
     * Salva a opção selecionado no local storage e chama o método do pai.
     * @param {String} value O valor selecionado
     */
    const changeValue = (value) => {
        AsyncStorage.setItem(props.storageKey, value)
        setValue(value)
        props.onChangeValue(value)
    };

    /**
     * Converte as opções do filtro em JSX para renderização
     * @returns O JSX para renderização
     */
    const getOptions = () =>{
        return props.options.map((option, value) =>{
            return(
                <TouchableOpacity key={value.toString()} style={styles.button} onPress={()  => changeValue(value.toString())}>
                    <RadioButton value={value.toString()} color={colors.primary}/>
                    <Text style={styles.option}>
                        {option}
                    </Text>
                </TouchableOpacity>
            )
        })
    }

    return (
        <SwipeablePanel 
        isActive={props.visible}
        onClose={props.onClose}
        showCloseButton={true}
        noBar
        closeOnTouchOutside={true}>
            <View>
                <Text style={styles.title}>  
                    {props.title}
                </Text> 
                <RadioButton.Group
                onValueChange={changeValue}
                value={value}>
                    {getOptions()}
                </RadioButton.Group>
            </View> 
        </SwipeablePanel>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    title:{
        fontWeight: 'bold',
        fontSize: 26,
        color: colors.primary,
        textAlign: 'center',
        marginVertical: 10
    },
    option:{
        fontSize: 22,
        color: colors.grey6
    },
    button:{
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        marginLeft: 12
    }
})