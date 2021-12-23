import React, { useState, useEffect} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList,
    TouchableOpacity,
    Keyboard
}  from 'react-native'
import HttpService from '../services/HttpService'
import colors from '../styles/colors'


export default props =>{
    
    const [data, setData] = useState([])
    const [text, setText] = useState('')
    const [showList, setShowList] = useState(false)

    const [keyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() =>{
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',
        () =>{
            setKeyboardVisible(true)
        })
        const keyboardDidHideListener =  Keyboard.addListener('keyboardDidHide',
        () =>{
            setKeyboardVisible(false)
        })
        return () =>{
            keyboardDidHideListener.remove()
            keyboardDidShowListener.remove()
        }
    }, [])

    const onChangeText = (text) =>{
        setText(text)
        props.onChange(text)
        if(text.length >= 3){
            searchMedsByName(text)
        }else{
            setShowList(false)
        }
    }


    const searchMedsByName = async (query) =>{
        const response = await HttpService.get(`/medicamentos/anvisa/busca?nome=${query}`);
        if(response.data){
            setData(response.data)
            setShowList(true)
        }
    }

    const onSelectMed = (med) =>{
        let newName = getMedDisplayName(med)
        setText(newName)
        setShowList(false)
        props.onChange(newName)
    }

    const getMedDisplayName = (med) =>{
        let displayName = med.nomePopular;
        if(med.farmaco.toLowerCase().startsWith(text)){
            displayName = med.farmaco;
        }
        return `${displayName} ${med.concentracao}` 
    }


    const renderItem = ({item : med}) =>{

        return(
            <TouchableOpacity
                style={styles.listItem}
                onPress={() => onSelectMed(med)}>
                <Text style={styles.text}>
                    {getMedDisplayName(med)}
                </Text>
            </TouchableOpacity>
        )
    }

    return(
        <View style={styles.container}>
            <TextInput style={[styles.inputBox, props.styles ? props.styles : {}]}
                placeholderTextColor={colors.grey6} 
                onChangeText={onChangeText}
                editable={props.editable != null ? props.editable : true}
                placeholder={props.placeholder}
                value={props.value != null ? props.value: text}    
            />

        {showList &&
            <View style={styles.listContainer}>
                <FlatList
                    keyboardShouldPersistTaps={'handled'}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>} 
        </View>

    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    inputBox:{
        height: 40,
        borderColor: colors.grey8,
        color: colors.grey4,
        borderRadius: 5,
        borderWidth: 1,
        marginTop: 5,
        padding: 10,
    },
    listContainer:{
        maxHeight: 200
    },
    listItem:{
        borderBottomWidth: 1,
        backgroundColor: colors.grey13,
        borderColor: colors.grey12,
        minHeight: 30, 
        justifyContent: 'center'
    },
    text:{
        color: colors.grey4,
        fontSize: 14,
        margin: 5
    },
})