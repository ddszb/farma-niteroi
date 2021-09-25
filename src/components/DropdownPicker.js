import React, { useState, useEffect} from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
}  from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import colors from '../styles/colors'

export default props =>{
    
    const [data, setData] = useState(props.data)
    const [text, setText] = useState('')
    const [showList, setShowList] = useState(false)


    const onPress = () =>{
        setShowList(!showList)

    }

    const onSelect = (opt) =>{
        setText(opt[props.labelField])
        setShowList(false)
        props.onSelect(opt)
    }


    const renderItem = ({item : opt}) =>{
        return(
            <TouchableOpacity
                style={styles.listItem}
                onPress={() => onSelect(opt)}>
                <Text numberOfLines={1} style={styles.text}>
                    {opt[props.labelField]}
                </Text>
            </TouchableOpacity>
        )
    }

    return(
        <View style={styles.container}>
            <TouchableOpacity
                onPress={onPress}>
                <View style={styles.row}>
                    <Text style={[props.styles ? props.styles : styles.input]}>
                        {props.title}
                    </Text>
                    <Icon name={showList ? "up" : "down"} type="ant-design" size={20} color={colors.grey10}/>
                </View>
                {!!text &&
                <Text style={styles.selectedText}>
                    {text}
                </Text>}
            </TouchableOpacity>
            <View>
                {showList &&
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />} 
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    input:{
        fontSize: 26,
        fontWeight: 'bold',
        color: colors.primary,
        marginRight: 7,
    },
    row:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 27
    },
    selectedText:{
        fontSize: 18,
        color: colors.grey8,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 16
    },
    listItem:{
        borderBottomWidth: 1,
        borderColor: colors.grey12,
        minHeight: 40, 
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        color: colors.grey4,
        fontSize: 18,
        margin: 5,
        textAlign: 'left'
    },
})