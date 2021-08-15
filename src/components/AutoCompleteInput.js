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


export default props =>{
    
    const [data, setData] = useState(props.data)
    const [filteredOptions, setFilteredOptions] = useState(data)
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
        setShowList(text != '')
        setText(text)
        filterData(text)
        props.onChange(text)
    }

    const onSelect = (opt) =>{
        setText(opt.value)
        setShowList(false)
        props.onChange(opt.value)
    }

    const filterData = (term)=>{
        let newOptions = data.filter( opt => opt.value.toLowerCase().includes(term.toLowerCase()))
        setFilteredOptions(newOptions)
    }

    const renderItem = ({item : opt}) =>{
        return(
            <TouchableOpacity
                 
                style={styles.listItem}
                onPress={() => onSelect(opt)}>
                <Text style={styles.text}>
                    {opt.value}
                </Text>
            </TouchableOpacity>
        )
    }

    return(
        <View style={styles.container}>
            <TextInput style={styles.inputBox}
                placeholderTextColor="#666" 
                onChangeText={onChangeText}
                placeholder={props.placeholder}
                value={text}    
            />

        {(showList && keyboardVisible) &&
            <FlatList
                keyboardShouldPersistTaps={'handled'}
                data={filteredOptions}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />} 
        </View>

    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    inputBox:{
        height: 40,
        borderColor: 'gray',
        color: '#444',
        borderRadius: 5,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderWidth: 1,
        marginTop: 5,
        padding: 10,
    },
    listItem:{
        borderBottomWidth: 1,
        backgroundColor: '#e7e7e7',
        borderColor: '#ccc',
        minHeight: 30, 
        justifyContent: 'center'
    },
    text:{
        color: '#333',
        fontSize: 14,
        margin: 5
    },
})